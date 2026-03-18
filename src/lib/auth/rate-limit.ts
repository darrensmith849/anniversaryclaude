type AttemptBucket = {
  count: number;
  lockedUntil: number | null;
  lastAttemptAt: number;
};

const buckets = new Map<string, AttemptBucket>();

const MAX_ATTEMPTS = 5;
const WINDOW_MS = 10 * 60 * 1000;
const LOCK_MS = 15 * 60 * 1000;

function now(): number {
  return Date.now();
}

function getBucket(email: string): AttemptBucket {
  const key = email.toLowerCase();
  const bucket = buckets.get(key);

  if (!bucket) {
    const next = { count: 0, lockedUntil: null, lastAttemptAt: now() };
    buckets.set(key, next);
    return next;
  }

  if (now() - bucket.lastAttemptAt > WINDOW_MS) {
    bucket.count = 0;
    bucket.lockedUntil = null;
  }

  return bucket;
}

export function isLoginBlocked(email: string): boolean {
  const bucket = getBucket(email);
  if (bucket.lockedUntil === null) {
    return false;
  }

  if (now() > bucket.lockedUntil) {
    bucket.lockedUntil = null;
    bucket.count = 0;
    return false;
  }

  return true;
}

export function registerLoginFailure(email: string): void {
  const bucket = getBucket(email);
  bucket.count += 1;
  bucket.lastAttemptAt = now();

  if (bucket.count >= MAX_ATTEMPTS) {
    bucket.lockedUntil = now() + LOCK_MS;
  }
}

export function registerLoginSuccess(email: string): void {
  const bucket = getBucket(email);
  bucket.count = 0;
  bucket.lockedUntil = null;
  bucket.lastAttemptAt = now();
}

export function resetLoginRateLimit(): void {
  buckets.clear();
}
