import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const dir = mkdtempSync(path.join(tmpdir(), 'dubai-house-test-'));
const origin = 'http://127.0.0.1:8011';
let server;
before(async () => {
  server = spawn(process.execPath, ['server/index.mjs'], { env: { ...process.env, PORT: '8011', DATA_DIR: dir }, stdio: 'pipe' });
  await new Promise((resolve, reject) => { server.stdout.on('data', output => { if (output.toString().includes('ready')) resolve(); }); server.once('error', reject); server.once('exit', code => reject(new Error(`Server exited: ${code}`))); });
});
after(async () => { server.kill(); await new Promise(resolve => server.once('exit', resolve)); rmSync(dir, { recursive: true, force: true }); });
const post = (endpoint, data) => fetch(`${origin}/api/${endpoint}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
test('database-backed status responds', async () => { const response = await fetch(`${origin}/api/status`); assert.equal(response.status, 200); assert.equal((await response.json()).status, 'ok'); });
test('inquiry rejects invalid submissions', async () => { const response = await post('inquiries', { name: 'A', email: 'invalid', message: 'short' }); assert.equal(response.status, 400); });
test('inquiry saves validated input to SQLite', async () => { const response = await post('inquiries', { name: 'Preview Tester', email: 'tester@example.com', message: 'A test inquiry for automated verification.', property: 'Palm Jumeirah Villa' }); assert.equal(response.status, 201); assert.match((await response.json()).reference, /^DH-\d+$/); const db = new DatabaseSync(path.join(dir, 'inquiries.sqlite')); const record = db.prepare('SELECT name,property FROM inquiries').get(); assert.equal(record.name, 'Preview Tester'); assert.equal(record.property, 'Palm Jumeirah Villa'); db.close(); });
test('newsletter is validated and duplicate-safe', async () => { assert.equal((await post('newsletter', { email: 'bad' })).status, 400); assert.equal((await post('newsletter', { email: 'newsletter@example.com' })).status, 201); assert.equal((await post('newsletter', { email: 'newsletter@example.com' })).status, 201); const db = new DatabaseSync(path.join(dir, 'inquiries.sqlite')); assert.equal(db.prepare('SELECT COUNT(*) AS n FROM subscribers').get().n, 1); db.close(); });
test('honeypot submissions are rejected', async () => { assert.equal((await post('newsletter', { email: 'bot@example.com', website: 'spam' })).status, 400); });
