#!/usr/bin/env python3
"""
Focused security test for SEC-002, SEC-003, SEC-004
Tests ONLY the 3 tasks in current_focus, does NOT re-test SEC-001 or admin auth.
"""
import requests
import os
import sys

BASE_URL = os.getenv('NEXT_PUBLIC_BASE_URL', 'https://asanyx-analytics.preview.emergentagent.com')
API_URL = f"{BASE_URL}/api"

ADMIN_EMAIL = "admin@asanyxanalytics.com"
ADMIN_PASSWORD = "N_WglwMNmE-YR8iG-c-2"

def test_sec_002_honeypot():
    """SEC-002 Test 1: Honeypot silently accepts but doesn't persist"""
    print("\n=== SEC-002 Test 1: Honeypot ===")
    try:
        # Submit with honeypot filled
        resp = requests.post(f"{API_URL}/contact", json={
            "name": "bot",
            "email": "b@b.com",
            "message": "spam",
            "_hp": "pwned"
        }, timeout=10)
        
        if resp.status_code != 200:
            print(f"❌ FAIL: Expected 200, got {resp.status_code}")
            return False
        
        data = resp.json()
        if not data.get('ok'):
            print(f"❌ FAIL: Expected ok:true, got {data}")
            return False
        
        print("✅ Honeypot submission returned 200 ok:true")
        
        # Now verify it was NOT persisted - login as admin and check contacts
        session = requests.Session()
        login_resp = session.post(f"{API_URL}/admin/login", json={
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        }, timeout=10)
        
        if login_resp.status_code != 200:
            print(f"❌ FAIL: Admin login failed with {login_resp.status_code}")
            return False
        
        # Get contacts
        contacts_resp = session.get(f"{API_URL}/contacts", timeout=10)
        if contacts_resp.status_code != 200:
            print(f"❌ FAIL: GET /api/contacts failed with {contacts_resp.status_code}")
            return False
        
        contacts_data = contacts_resp.json()
        items = contacts_data.get('items', [])
        
        # Check if bot submission is in the list
        bot_found = any(
            item.get('name') == 'bot' and 
            item.get('email') == 'b@b.com' and 
            item.get('message') == 'spam'
            for item in items
        )
        
        if bot_found:
            print(f"❌ FAIL: Bot submission was persisted (should have been dropped)")
            return False
        
        print("✅ Bot submission was NOT persisted (correctly dropped)")
        return True
        
    except Exception as e:
        print(f"❌ EXCEPTION: {e}")
        return False

def test_sec_002_nosql_injection():
    """SEC-002 Test 2: Newsletter NoSQL injection guard"""
    print("\n=== SEC-002 Test 2: NoSQL Injection Guard ===")
    try:
        # Test 1: Object injection
        resp1 = requests.post(f"{API_URL}/newsletter", json={
            "email": {"$ne": None}
        }, timeout=10)
        
        if resp1.status_code != 400:
            print(f"❌ FAIL: Expected 400 for object injection, got {resp1.status_code}")
            return False
        
        data1 = resp1.json()
        if data1.get('ok') or 'Email is required' not in data1.get('error', ''):
            print(f"❌ FAIL: Expected 'Email is required' error, got {data1}")
            return False
        
        print("✅ Object injection blocked with 400 'Email is required'")
        
        # Test 2: Number injection
        resp2 = requests.post(f"{API_URL}/newsletter", json={
            "email": 123
        }, timeout=10)
        
        if resp2.status_code != 400:
            print(f"❌ FAIL: Expected 400 for number injection, got {resp2.status_code}")
            return False
        
        data2 = resp2.json()
        if data2.get('ok') or 'Email is required' not in data2.get('error', ''):
            print(f"❌ FAIL: Expected 'Email is required' error, got {data2}")
            return False
        
        print("✅ Number injection blocked with 400 'Email is required'")
        return True
        
    except Exception as e:
        print(f"❌ EXCEPTION: {e}")
        return False

def test_sec_002_rate_limit():
    """SEC-002 Test 3: Rate limit trips at 9th request"""
    print("\n=== SEC-002 Test 3: Rate Limit (8/10min) ===")
    try:
        # Hit newsletter endpoint 9 times
        for i in range(1, 10):
            resp = requests.post(f"{API_URL}/newsletter", json={
                "email": f"test{i}@ratelimit.com"
            }, timeout=10)
            
            if i <= 8:
                if resp.status_code != 200:
                    print(f"❌ FAIL: Request {i} expected 200, got {resp.status_code}")
                    return False
                print(f"✅ Request {i}/9: 200 OK")
            else:
                if resp.status_code != 429:
                    print(f"❌ FAIL: Request {i} expected 429, got {resp.status_code}")
                    return False
                
                retry_after = resp.headers.get('Retry-After')
                if not retry_after:
                    print(f"❌ FAIL: Request {i} missing Retry-After header")
                    return False
                
                print(f"✅ Request {i}/9: 429 Too Many Requests with Retry-After: {retry_after}s")
        
        return True
        
    except Exception as e:
        print(f"❌ EXCEPTION: {e}")
        return False

def test_sec_002_admin_rate_limit():
    """SEC-002 Test 4: Admin login rate limit (5/15min)"""
    print("\n=== SEC-002 Test 4: Admin Login Rate Limit ===")
    try:
        # Hit admin login with wrong password 6 times
        for i in range(1, 7):
            resp = requests.post(f"{API_URL}/admin/login", json={
                "email": ADMIN_EMAIL,
                "password": "wrongpassword"
            }, timeout=10)
            
            if i <= 5:
                if resp.status_code != 401:
                    print(f"❌ FAIL: Request {i} expected 401, got {resp.status_code}")
                    return False
                print(f"✅ Request {i}/6: 401 Unauthorized")
            else:
                if resp.status_code != 429:
                    print(f"❌ FAIL: Request {i} expected 429, got {resp.status_code}")
                    return False
                
                retry_after = resp.headers.get('Retry-After')
                if not retry_after:
                    print(f"❌ FAIL: Request {i} missing Retry-After header")
                    return False
                
                print(f"✅ Request {i}/6: 429 Too Many Requests with Retry-After: {retry_after}s")
        
        return True
        
    except Exception as e:
        print(f"❌ EXCEPTION: {e}")
        return False

def test_sec_003_resume_url_validation():
    """SEC-003: Resume URL validation"""
    print("\n=== SEC-003: Resume URL Validation ===")
    try:
        # Test 1: javascript: scheme
        resp1 = requests.post(f"{API_URL}/careers/apply", json={
            "name": "x",
            "email": "x@x.com",
            "resumeUrl": "javascript:alert(1)"
        }, timeout=10)
        
        if resp1.status_code != 400:
            print(f"❌ FAIL: javascript: expected 400, got {resp1.status_code}")
            return False
        
        data1 = resp1.json()
        error1 = data1.get('error', '').lower()
        if 'http' not in error1 and 'url' not in error1:
            print(f"❌ FAIL: Expected error about http/URL, got {data1}")
            return False
        
        print("✅ javascript: scheme blocked with 400")
        
        # Test 2: data: scheme
        resp2 = requests.post(f"{API_URL}/careers/apply", json={
            "name": "x",
            "email": "x@x.com",
            "resumeUrl": "data:text/html,<script>alert(1)</script>"
        }, timeout=10)
        
        if resp2.status_code != 400:
            print(f"❌ FAIL: data: expected 400, got {resp2.status_code}")
            return False
        
        print("✅ data: scheme blocked with 400")
        
        # Test 3: file: scheme
        resp3 = requests.post(f"{API_URL}/careers/apply", json={
            "name": "x",
            "email": "x@x.com",
            "resumeUrl": "file:///etc/passwd"
        }, timeout=10)
        
        if resp3.status_code != 400:
            print(f"❌ FAIL: file: expected 400, got {resp3.status_code}")
            return False
        
        print("✅ file: scheme blocked with 400")
        
        # Test 4: Valid https URL
        resp4 = requests.post(f"{API_URL}/careers/apply", json={
            "name": "John Doe",
            "email": "john@example.com",
            "resumeUrl": "https://drive.google.com/file/d/abc123/view"
        }, timeout=10)
        
        if resp4.status_code != 200:
            print(f"❌ FAIL: Valid https URL expected 200, got {resp4.status_code}")
            return False
        
        data4 = resp4.json()
        if not data4.get('ok'):
            print(f"❌ FAIL: Valid https URL expected ok:true, got {data4}")
            return False
        
        print("✅ Valid https:// URL accepted with 200")
        
        # Test 5: Empty resumeUrl
        resp5 = requests.post(f"{API_URL}/careers/apply", json={
            "name": "Jane Doe",
            "email": "jane@example.com",
            "resumeUrl": ""
        }, timeout=10)
        
        if resp5.status_code != 200:
            print(f"❌ FAIL: Empty resumeUrl expected 200, got {resp5.status_code}")
            return False
        
        data5 = resp5.json()
        if not data5.get('ok'):
            print(f"❌ FAIL: Empty resumeUrl expected ok:true, got {data5}")
            return False
        
        print("✅ Empty resumeUrl accepted with 200")
        
        return True
        
    except Exception as e:
        print(f"❌ EXCEPTION: {e}")
        return False

def test_sec_004_security_headers():
    """SEC-004: Security headers"""
    print("\n=== SEC-004: Security Headers ===")
    try:
        # Test on GET /api/health
        resp = requests.get(f"{API_URL}/health", timeout=10)
        
        if resp.status_code != 200:
            print(f"❌ FAIL: GET /api/health returned {resp.status_code}")
            return False
        
        headers = resp.headers
        
        # Check required headers
        checks = [
            ('X-Content-Type-Options', 'nosniff', lambda v: v == 'nosniff'),
            ('X-Frame-Options', 'SAMEORIGIN', lambda v: v == 'SAMEORIGIN' and v != 'ALLOWALL'),
            ('Strict-Transport-Security', 'max-age=63072000', lambda v: 'max-age=63072000' in v),
            ('Referrer-Policy', 'strict-origin-when-cross-origin', lambda v: v == 'strict-origin-when-cross-origin'),
            ('Content-Security-Policy', 'frame-ancestors', lambda v: "frame-ancestors 'self'" in v and 'frame-ancestors *' not in v),
            ('Content-Security-Policy', 'default-src', lambda v: "default-src 'self'" in v),
        ]
        
        all_passed = True
        for header_name, expected_part, check_fn in checks:
            header_value = headers.get(header_name, '')
            if not check_fn(header_value):
                print(f"❌ FAIL: {header_name} check failed. Value: {header_value}")
                all_passed = False
            else:
                print(f"✅ {header_name}: {expected_part} ✓")
        
        # Verify X-Frame-Options is NOT ALLOWALL
        xfo = headers.get('X-Frame-Options', '')
        if xfo == 'ALLOWALL':
            print(f"❌ FAIL: X-Frame-Options must NOT be ALLOWALL")
            all_passed = False
        
        # Verify CSP does NOT contain frame-ancestors *
        csp = headers.get('Content-Security-Policy', '')
        if 'frame-ancestors *' in csp:
            print(f"❌ FAIL: CSP must NOT contain 'frame-ancestors *'")
            all_passed = False
        
        return all_passed
        
    except Exception as e:
        print(f"❌ EXCEPTION: {e}")
        return False

def main():
    print("=" * 60)
    print("SECURITY TEST: SEC-002, SEC-003, SEC-004")
    print("=" * 60)
    
    results = {}
    
    # SEC-002: Rate limiting + honeypot
    print("\n" + "=" * 60)
    print("SEC-002: Rate Limiting + Honeypot")
    print("=" * 60)
    results['SEC-002-1-honeypot'] = test_sec_002_honeypot()
    results['SEC-002-2-nosql'] = test_sec_002_nosql_injection()
    results['SEC-002-3-rate-limit'] = test_sec_002_rate_limit()
    results['SEC-002-4-admin-rate'] = test_sec_002_admin_rate_limit()
    
    # SEC-003: Resume URL validation
    print("\n" + "=" * 60)
    print("SEC-003: Resume URL Validation")
    print("=" * 60)
    results['SEC-003'] = test_sec_003_resume_url_validation()
    
    # SEC-004: Security headers
    print("\n" + "=" * 60)
    print("SEC-004: Security Headers")
    print("=" * 60)
    results['SEC-004'] = test_sec_004_security_headers()
    
    # Summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    
    sec_002_passed = all([
        results['SEC-002-1-honeypot'],
        results['SEC-002-2-nosql'],
        results['SEC-002-3-rate-limit'],
        results['SEC-002-4-admin-rate']
    ])
    
    print(f"\nSEC-002 (Rate limiting + honeypot): {'✅ PASS' if sec_002_passed else '❌ FAIL'}")
    print(f"  - Honeypot: {'✅' if results['SEC-002-1-honeypot'] else '❌'}")
    print(f"  - NoSQL injection guard: {'✅' if results['SEC-002-2-nosql'] else '❌'}")
    print(f"  - Rate limit (8/10min): {'✅' if results['SEC-002-3-rate-limit'] else '❌'}")
    print(f"  - Admin rate limit (5/15min): {'✅' if results['SEC-002-4-admin-rate'] else '❌'}")
    
    print(f"\nSEC-003 (Resume URL validation): {'✅ PASS' if results['SEC-003'] else '❌ FAIL'}")
    print(f"\nSEC-004 (Security headers): {'✅ PASS' if results['SEC-004'] else '❌ FAIL'}")
    
    all_passed = sec_002_passed and results['SEC-003'] and results['SEC-004']
    
    print("\n" + "=" * 60)
    print(f"OVERALL: {'✅ ALL TESTS PASSED' if all_passed else '❌ SOME TESTS FAILED'}")
    print("=" * 60)
    
    sys.exit(0 if all_passed else 1)

if __name__ == '__main__':
    main()
