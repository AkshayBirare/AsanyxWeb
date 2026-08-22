#!/usr/bin/env python3
"""
Isolated security tests - each test restarts to avoid rate limit interference
"""
import requests
import os
import subprocess
import time

BASE_URL = os.getenv('NEXT_PUBLIC_BASE_URL', 'https://asanyx-analytics.preview.emergentagent.com')
API_URL = f"{BASE_URL}/api"

ADMIN_EMAIL = "admin@asanyxanalytics.com"
ADMIN_PASSWORD = "N_WglwMNmE-YR8iG-c-2"

def restart_nextjs():
    """Restart nextjs to clear rate limit buckets"""
    print("🔄 Restarting nextjs to clear rate limit buckets...")
    subprocess.run(['sudo', 'supervisorctl', 'restart', 'nextjs'], check=True, capture_output=True)
    time.sleep(8)
    print("✅ Nextjs restarted\n")

def test_honeypot_and_nosql():
    """Test honeypot and NoSQL injection (these don't interfere with rate limits)"""
    print("=" * 60)
    print("TEST 1: Honeypot + NoSQL Injection Guard")
    print("=" * 60)
    
    # Test honeypot
    print("\n1. Honeypot Test:")
    resp = requests.post(f"{API_URL}/contact", json={
        "name": "bot",
        "email": "b@b.com",
        "message": "spam",
        "_hp": "pwned"
    }, timeout=10)
    
    if resp.status_code != 200 or not resp.json().get('ok'):
        print(f"❌ Honeypot failed: {resp.status_code} {resp.json()}")
        return False
    print("✅ Honeypot returns 200 ok:true")
    
    # Verify not persisted
    session = requests.Session()
    login_resp = session.post(f"{API_URL}/admin/login", json={
        "email": ADMIN_EMAIL,
        "password": ADMIN_PASSWORD
    }, timeout=10)
    
    if login_resp.status_code != 200:
        print(f"❌ Admin login failed")
        return False
    
    contacts_resp = session.get(f"{API_URL}/contacts", timeout=10)
    items = contacts_resp.json().get('items', [])
    bot_found = any(
        item.get('name') == 'bot' and 
        item.get('email') == 'b@b.com' and 
        item.get('message') == 'spam'
        for item in items
    )
    
    if bot_found:
        print(f"❌ Bot submission was persisted (should be dropped)")
        return False
    print("✅ Bot submission NOT persisted (correctly dropped)")
    
    # Test NoSQL injection
    print("\n2. NoSQL Injection Guard:")
    resp1 = requests.post(f"{API_URL}/newsletter", json={"email": {"$ne": None}}, timeout=10)
    if resp1.status_code != 400 or 'Email is required' not in resp1.json().get('error', ''):
        print(f"❌ Object injection not blocked: {resp1.status_code} {resp1.json()}")
        return False
    print("✅ Object injection blocked")
    
    resp2 = requests.post(f"{API_URL}/newsletter", json={"email": 123}, timeout=10)
    if resp2.status_code != 400:
        print(f"❌ Number injection not blocked")
        return False
    print("✅ Number injection blocked")
    
    return True

def test_rate_limit_public_forms():
    """Test rate limit on public forms (8/10min)"""
    print("\n" + "=" * 60)
    print("TEST 2: Public Form Rate Limit (8/10min)")
    print("=" * 60)
    restart_nextjs()
    
    # Hit newsletter 9 times
    for i in range(1, 10):
        resp = requests.post(f"{API_URL}/newsletter", json={
            "email": f"ratelimit{i}@test.com"
        }, timeout=10)
        
        if i <= 8:
            if resp.status_code != 200:
                print(f"❌ Request {i}/9 expected 200, got {resp.status_code}")
                return False
            print(f"✅ Request {i}/9: 200 OK")
        else:
            if resp.status_code != 429:
                print(f"❌ Request {i}/9 expected 429, got {resp.status_code}")
                return False
            retry_after = resp.headers.get('Retry-After')
            if not retry_after:
                print(f"❌ Missing Retry-After header")
                return False
            print(f"✅ Request {i}/9: 429 with Retry-After: {retry_after}s")
    
    return True

def test_admin_login_rate_limit():
    """Test admin login rate limit (5/15min)"""
    print("\n" + "=" * 60)
    print("TEST 3: Admin Login Rate Limit (5/15min)")
    print("=" * 60)
    restart_nextjs()
    
    # Hit admin login with wrong password 6 times
    for i in range(1, 7):
        resp = requests.post(f"{API_URL}/admin/login", json={
            "email": ADMIN_EMAIL,
            "password": "wrongpassword"
        }, timeout=10)
        
        if i <= 5:
            if resp.status_code != 401:
                print(f"❌ Request {i}/6 expected 401, got {resp.status_code}")
                return False
            print(f"✅ Request {i}/6: 401 Unauthorized")
        else:
            if resp.status_code != 429:
                print(f"❌ Request {i}/6 expected 429, got {resp.status_code}")
                return False
            retry_after = resp.headers.get('Retry-After')
            if not retry_after:
                print(f"❌ Missing Retry-After header")
                return False
            print(f"✅ Request {i}/6: 429 with Retry-After: {retry_after}s")
    
    return True

def test_resume_url_validation():
    """Test resume URL validation"""
    print("\n" + "=" * 60)
    print("TEST 4: Resume URL Validation")
    print("=" * 60)
    restart_nextjs()
    
    tests = [
        ("javascript:alert(1)", 400, "javascript: scheme"),
        ("data:text/html,<script>alert(1)</script>", 400, "data: scheme"),
        ("file:///etc/passwd", 400, "file: scheme"),
        ("https://drive.google.com/file/d/abc123/view", 200, "valid https URL"),
        ("", 200, "empty URL"),
    ]
    
    for url, expected_status, desc in tests:
        resp = requests.post(f"{API_URL}/careers/apply", json={
            "name": "Test User",
            "email": "test@example.com",
            "resumeUrl": url
        }, timeout=10)
        
        if resp.status_code != expected_status:
            print(f"❌ {desc}: expected {expected_status}, got {resp.status_code}")
            return False
        
        if expected_status == 400:
            error = resp.json().get('error', '').lower()
            if 'http' not in error and 'url' not in error:
                print(f"❌ {desc}: error message doesn't mention http/URL: {error}")
                return False
        
        print(f"✅ {desc}: {resp.status_code}")
    
    return True

def test_security_headers():
    """Test security headers"""
    print("\n" + "=" * 60)
    print("TEST 5: Security Headers")
    print("=" * 60)
    
    resp = requests.get(f"{API_URL}/health", timeout=10)
    
    if resp.status_code != 200:
        print(f"❌ GET /api/health returned {resp.status_code}")
        return False
    
    headers = resp.headers
    
    checks = [
        ('X-Content-Type-Options', 'nosniff', lambda v: v == 'nosniff'),
        ('X-Frame-Options', 'SAMEORIGIN', lambda v: v == 'SAMEORIGIN'),
        ('Strict-Transport-Security', 'max-age=63072000', lambda v: 'max-age=63072000' in v),
        ('Referrer-Policy', 'strict-origin-when-cross-origin', lambda v: v == 'strict-origin-when-cross-origin'),
        ('Content-Security-Policy', "frame-ancestors 'self'", lambda v: "frame-ancestors 'self'" in v and 'frame-ancestors *' not in v),
        ('Content-Security-Policy', "default-src 'self'", lambda v: "default-src 'self'" in v),
    ]
    
    all_passed = True
    for header_name, expected_part, check_fn in checks:
        header_value = headers.get(header_name, '')
        if not check_fn(header_value):
            print(f"❌ {header_name}: {expected_part} check failed")
            all_passed = False
        else:
            print(f"✅ {header_name}: {expected_part}")
    
    # Verify X-Frame-Options is NOT ALLOWALL
    xfo = headers.get('X-Frame-Options', '')
    if xfo == 'ALLOWALL':
        print(f"❌ X-Frame-Options must NOT be ALLOWALL")
        all_passed = False
    
    # Verify CSP does NOT contain frame-ancestors *
    csp = headers.get('Content-Security-Policy', '')
    if 'frame-ancestors *' in csp:
        print(f"❌ CSP must NOT contain 'frame-ancestors *'")
        all_passed = False
    
    return all_passed

def main():
    print("\n" + "=" * 60)
    print("ISOLATED SECURITY TESTS")
    print("=" * 60 + "\n")
    
    results = {}
    
    # Test 1: Honeypot + NoSQL (no restart needed, doesn't hit rate limits)
    results['honeypot_nosql'] = test_honeypot_and_nosql()
    
    # Test 2: Public form rate limit (restart before)
    results['rate_limit_public'] = test_rate_limit_public_forms()
    
    # Test 3: Admin login rate limit (restart before)
    results['rate_limit_admin'] = test_admin_login_rate_limit()
    
    # Test 4: Resume URL validation (restart before)
    results['resume_url'] = test_resume_url_validation()
    
    # Test 5: Security headers (no restart needed)
    results['security_headers'] = test_security_headers()
    
    # Summary
    print("\n" + "=" * 60)
    print("FINAL SUMMARY")
    print("=" * 60)
    print(f"\nSEC-002 Honeypot + NoSQL: {'✅ PASS' if results['honeypot_nosql'] else '❌ FAIL'}")
    print(f"SEC-002 Public Rate Limit: {'✅ PASS' if results['rate_limit_public'] else '❌ FAIL'}")
    print(f"SEC-002 Admin Rate Limit: {'✅ PASS' if results['rate_limit_admin'] else '❌ FAIL'}")
    print(f"SEC-003 Resume URL: {'✅ PASS' if results['resume_url'] else '❌ FAIL'}")
    print(f"SEC-004 Security Headers: {'✅ PASS' if results['security_headers'] else '❌ FAIL'}")
    
    sec_002_pass = results['honeypot_nosql'] and results['rate_limit_public'] and results['rate_limit_admin']
    
    print(f"\n{'='*60}")
    print(f"SEC-002 (Rate limiting + honeypot): {'✅ PASS' if sec_002_pass else '❌ FAIL'}")
    print(f"SEC-003 (Resume URL validation): {'✅ PASS' if results['resume_url'] else '❌ FAIL'}")
    print(f"SEC-004 (Security headers): {'✅ PASS' if results['security_headers'] else '❌ FAIL'}")
    print(f"{'='*60}\n")
    
    all_passed = all(results.values())
    print(f"OVERALL: {'✅ ALL SECURITY TESTS PASSED' if all_passed else '❌ SOME TESTS FAILED'}\n")
    
    return 0 if all_passed else 1

if __name__ == '__main__':
    exit(main())
