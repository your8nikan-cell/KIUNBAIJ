import express from 'express';
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const dataDir = process.env.DATA_DIR || '/tmp/dubai-house';
mkdirSync(dataDir, { recursive: true });
const db = new DatabaseSync(path.join(dataDir, 'inquiries.sqlite'));
db.exec(`PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS inquiries (id INTEGER PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, phone TEXT, interest TEXT, budget TEXT, message TEXT NOT NULL, property TEXT, created_at TEXT DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS subscribers (id INTEGER PRIMARY KEY, email TEXT NOT NULL UNIQUE, created_at TEXT DEFAULT CURRENT_TIMESTAMP);`);
app.disable('x-powered-by');
app.use(express.json({ limit: '16kb' }));
app.use((_req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});
app.get('/api/status', (_req, res) => {
  db.prepare('SELECT 1').get();
  res.json({ status: 'ok' });
});
const attempts = new Map();
setInterval(() => { const now = Date.now(); for (const [key, entry] of attempts) if (now - entry.start > 600000) attempts.delete(key); }, 60000).unref();
function limit(req, res, next) {
  const key = req.ip;
  const now = Date.now();
  const entry = attempts.get(key) || { start: now, count: 0 };
  if (now - entry.start > 600000) { entry.start = now; entry.count = 0; }
  entry.count++; attempts.set(key, entry);
  if (entry.count > 20) return res.status(429).json({ error: 'Too many requests. Please try again in a few minutes.' });
  next();
}
const text = (value, max) => typeof value === 'string' ? value.trim().slice(0, max) : '';
const emailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
app.post('/api/inquiries', limit, (req, res) => {
  if (req.body.website) return res.status(400).json({ error: 'Unable to submit this request.' });
  const name = text(req.body.name, 120), email = text(req.body.email, 254), message = text(req.body.message, 4000);
  if (name.length < 2 || !emailValid(email) || message.length < 10) return res.status(400).json({ error: 'Please enter your name, a valid email, and a message of at least 10 characters.' });
  const result = db.prepare('INSERT INTO inquiries (name,email,phone,interest,budget,message,property) VALUES (?,?,?,?,?,?,?)').run(name, email, text(req.body.phone, 40), text(req.body.interest, 80), text(req.body.budget, 80), message, text(req.body.property, 120));
  res.status(201).json({ ok: true, reference: `DH-${result.lastInsertRowid}` });
});
app.post('/api/newsletter', limit, (req, res) => {
  const email = text(req.body.email, 254).toLowerCase();
  if (!emailValid(email) || req.body.website) return res.status(400).json({ error: 'Please enter a valid email address.' });
  db.prepare('INSERT OR IGNORE INTO subscribers (email) VALUES (?)').run(email);
  res.status(201).json({ ok: true });
});
app.use('/api', (_req, res) => res.status(404).json({ error: 'Not found.' }));
if (process.env.NODE_ENV === 'production') {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
  app.use(express.static(root, { maxAge: '1h' }));
  app.get('*', (_req, res) => res.sendFile(path.join(root, 'index.html')));
}
app.use((err, _req, res, _next) => res.status(err.status || 500).json({ error: err.status === 400 ? 'Invalid request.' : 'Something went wrong. Please try again.' }));
app.listen(Number(process.env.PORT || 8000), '0.0.0.0', () => console.log('Dubai House server ready'));
