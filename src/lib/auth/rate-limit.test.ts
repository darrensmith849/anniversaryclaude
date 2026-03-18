import test from "node:test";
import assert from "node:assert/strict";
import {
  isLoginBlocked,
  registerLoginFailure,
  registerLoginSuccess,
  resetLoginRateLimit,
} from "@/lib/auth/rate-limit";

test("login is blocked after repeated failures", () => {
  resetLoginRateLimit();
  const email = "guest@example.com";

  for (let index = 0; index < 5; index += 1) {
    registerLoginFailure(email);
  }

  assert.equal(isLoginBlocked(email), true);
});

test("successful login clears lock state", () => {
  resetLoginRateLimit();
  const email = "guest@example.com";

  for (let index = 0; index < 5; index += 1) {
    registerLoginFailure(email);
  }

  assert.equal(isLoginBlocked(email), true);
  registerLoginSuccess(email);
  assert.equal(isLoginBlocked(email), false);
});
