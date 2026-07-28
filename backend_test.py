#!/usr/bin/env python3
"""
Backend API Test Suite for ASANYX Analytics
Tests all 7 API endpoints with validation and MongoDB verification
"""

import requests
import json
import sys
from datetime import datetime

# Load base URL from .env
BASE_URL = "https://asanyx-analytics.preview.emergentagent.com/api"

def print_test(name, passed, details=""):
    """Print test result with formatting"""
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status} | {name}")
    if details:
        print(f"    {details}")
    print()

def test_root_endpoint():
    """Test 1: GET /api/ - Root endpoint"""
    print("=" * 60)
    print("TEST 1: Root API Endpoint")
    print("=" * 60)
    try:
        response = requests.get(f"{BASE_URL}/", timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 200 and
            data.get('ok') == True and
            data.get('message') == 'ASANYX Analytics API' and
            data.get('version') == '1.0.0'
        )
        
        print_test(
            "GET /api/",
            passed,
            f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        )
        return passed
    except Exception as e:
        print_test("GET /api/", False, f"Exception: {str(e)}")
        return False

def test_health_endpoint():
    """Test 2: GET /api/health - Health check"""
    print("=" * 60)
    print("TEST 2: Health Check Endpoint")
    print("=" * 60)
    try:
        response = requests.get(f"{BASE_URL}/health", timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 200 and
            data.get('ok') == True and
            data.get('status') == 'healthy'
        )
        
        print_test(
            "GET /api/health",
            passed,
            f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        )
        return passed
    except Exception as e:
        print_test("GET /api/health", False, f"Exception: {str(e)}")
        return False

def test_contact_form():
    """Test 3: POST /api/contact - Contact form submission"""
    print("=" * 60)
    print("TEST 3: Contact Form Submission")
    print("=" * 60)
    
    results = []
    
    # Test 3a: Missing required fields (should return 400)
    try:
        payload = {"name": "John Doe"}  # Missing email and message
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        data = response.json()
        
        passed = response.status_code == 400 and data.get('ok') == False
        print_test(
            "POST /api/contact (missing fields)",
            passed,
            f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        )
        results.append(passed)
    except Exception as e:
        print_test("POST /api/contact (missing fields)", False, f"Exception: {str(e)}")
        results.append(False)
    
    # Test 3b: Valid contact form submission
    try:
        payload = {
            "name": "Sarah Johnson",
            "email": "sarah.johnson@techcorp.com",
            "message": "We are interested in your BI and analytics consulting services for our enterprise.",
            "company": "TechCorp Industries",
            "phone": "+1-555-0123",
            "service": "Business Intelligence"
        }
        response = requests.post(f"{BASE_URL}/contact", json=payload, timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 200 and
            data.get('ok') == True and
            'id' in data
        )
        
        print_test(
            "POST /api/contact (valid payload)",
            passed,
            f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        )
        results.append(passed)
        
        # Verify MongoDB write
        if passed:
            contact_id = data.get('id')
            verify_response = requests.get(f"{BASE_URL}/contacts", timeout=10)
            verify_data = verify_response.json()
            
            if verify_data.get('ok') and 'items' in verify_data:
                found = any(item.get('id') == contact_id for item in verify_data['items'])
                print_test(
                    "MongoDB verification (contact)",
                    found,
                    f"Contact ID {contact_id} {'found' if found else 'NOT FOUND'} in database"
                )
                results.append(found)
            else:
                print_test("MongoDB verification (contact)", False, "Could not fetch contacts")
                results.append(False)
    except Exception as e:
        print_test("POST /api/contact (valid payload)", False, f"Exception: {str(e)}")
        results.append(False)
    
    return all(results)

def test_consultation_booking():
    """Test 4: POST /api/consultation - Consultation booking"""
    print("=" * 60)
    print("TEST 4: Consultation Booking")
    print("=" * 60)
    
    results = []
    
    # Test 4a: Missing required fields
    try:
        payload = {"name": "Jane Doe"}  # Missing email
        response = requests.post(f"{BASE_URL}/consultation", json=payload, timeout=10)
        data = response.json()
        
        passed = response.status_code == 400 and data.get('ok') == False
        print_test(
            "POST /api/consultation (missing email)",
            passed,
            f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        )
        results.append(passed)
    except Exception as e:
        print_test("POST /api/consultation (missing email)", False, f"Exception: {str(e)}")
        results.append(False)
    
    # Test 4b: Valid consultation booking
    try:
        payload = {
            "name": "Michael Chen",
            "email": "michael.chen@dataventures.com",
            "company": "DataVentures LLC",
            "phone": "+1-555-0456",
            "preferredTime": "Next Tuesday 2-4 PM EST",
            "topic": "AI/ML implementation strategy"
        }
        response = requests.post(f"{BASE_URL}/consultation", json=payload, timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 200 and
            data.get('ok') == True and
            'id' in data
        )
        
        print_test(
            "POST /api/consultation (valid payload)",
            passed,
            f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        )
        results.append(passed)
    except Exception as e:
        print_test("POST /api/consultation (valid payload)", False, f"Exception: {str(e)}")
        results.append(False)
    
    return all(results)

def test_newsletter_subscription():
    """Test 5: POST /api/newsletter - Newsletter subscription"""
    print("=" * 60)
    print("TEST 5: Newsletter Subscription")
    print("=" * 60)
    
    results = []
    
    # Test 5a: Missing email
    try:
        payload = {}
        response = requests.post(f"{BASE_URL}/newsletter", json=payload, timeout=10)
        data = response.json()
        
        passed = response.status_code == 400 and data.get('ok') == False
        print_test(
            "POST /api/newsletter (missing email)",
            passed,
            f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        )
        results.append(passed)
    except Exception as e:
        print_test("POST /api/newsletter (missing email)", False, f"Exception: {str(e)}")
        results.append(False)
    
    # Test 5b: Valid newsletter subscription
    try:
        test_email = f"newsletter.test.{datetime.now().timestamp()}@example.com"
        payload = {"email": test_email}
        response = requests.post(f"{BASE_URL}/newsletter", json=payload, timeout=10)
        data = response.json()
        
        passed = response.status_code == 200 and data.get('ok') == True
        print_test(
            "POST /api/newsletter (valid email)",
            passed,
            f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        )
        results.append(passed)
    except Exception as e:
        print_test("POST /api/newsletter (valid email)", False, f"Exception: {str(e)}")
        results.append(False)
    
    # Test 5c: Idempotent upsert (same email twice)
    try:
        test_email = f"idempotent.test.{datetime.now().timestamp()}@example.com"
        payload = {"email": test_email}
        
        # First submission
        response1 = requests.post(f"{BASE_URL}/newsletter", json=payload, timeout=10)
        data1 = response1.json()
        
        # Second submission (same email)
        response2 = requests.post(f"{BASE_URL}/newsletter", json=payload, timeout=10)
        data2 = response2.json()
        
        passed = (
            response1.status_code == 200 and data1.get('ok') == True and
            response2.status_code == 200 and data2.get('ok') == True
        )
        
        print_test(
            "POST /api/newsletter (idempotent upsert)",
            passed,
            f"First: {response1.status_code}, Second: {response2.status_code} - Both should return ok:true"
        )
        results.append(passed)
    except Exception as e:
        print_test("POST /api/newsletter (idempotent upsert)", False, f"Exception: {str(e)}")
        results.append(False)
    
    return all(results)

def test_careers_application():
    """Test 6: POST /api/careers/apply - Career application"""
    print("=" * 60)
    print("TEST 6: Career Application")
    print("=" * 60)
    
    results = []
    
    # Test 6a: Missing required fields
    try:
        payload = {"name": "John Smith"}  # Missing email
        response = requests.post(f"{BASE_URL}/careers/apply", json=payload, timeout=10)
        data = response.json()
        
        passed = response.status_code == 400 and data.get('ok') == False
        print_test(
            "POST /api/careers/apply (missing email)",
            passed,
            f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        )
        results.append(passed)
    except Exception as e:
        print_test("POST /api/careers/apply (missing email)", False, f"Exception: {str(e)}")
        results.append(False)
    
    # Test 6b: Valid career application
    try:
        payload = {
            "name": "Emily Rodriguez",
            "email": "emily.rodriguez@email.com",
            "phone": "+1-555-0789",
            "role": "Senior Data Engineer",
            "message": "I have 8 years of experience in data engineering with expertise in Spark, Airflow, and cloud platforms.",
            "resumeUrl": "https://example.com/resumes/emily-rodriguez.pdf"
        }
        response = requests.post(f"{BASE_URL}/careers/apply", json=payload, timeout=10)
        data = response.json()
        
        passed = (
            response.status_code == 200 and
            data.get('ok') == True and
            'id' in data
        )
        
        print_test(
            "POST /api/careers/apply (valid payload)",
            passed,
            f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        )
        results.append(passed)
    except Exception as e:
        print_test("POST /api/careers/apply (valid payload)", False, f"Exception: {str(e)}")
        results.append(False)
    
    return all(results)

def test_resources_download():
    """Test 7: POST /api/resources/download - Resource download tracking"""
    print("=" * 60)
    print("TEST 7: Resource Download Tracking")
    print("=" * 60)
    
    results = []
    
    # Test 7a: Missing required title
    try:
        payload = {"email": "test@example.com"}  # Missing title
        response = requests.post(f"{BASE_URL}/resources/download", json=payload, timeout=10)
        data = response.json()
        
        passed = response.status_code == 400 and data.get('ok') == False
        print_test(
            "POST /api/resources/download (missing title)",
            passed,
            f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        )
        results.append(passed)
    except Exception as e:
        print_test("POST /api/resources/download (missing title)", False, f"Exception: {str(e)}")
        results.append(False)
    
    # Test 7b: Valid resource download (with email)
    try:
        payload = {
            "title": "Data Analytics Best Practices Whitepaper 2024",
            "email": "david.kim@enterprise.com"
        }
        response = requests.post(f"{BASE_URL}/resources/download", json=payload, timeout=10)
        data = response.json()
        
        passed = response.status_code == 200 and data.get('ok') == True
        print_test(
            "POST /api/resources/download (with email)",
            passed,
            f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        )
        results.append(passed)
    except Exception as e:
        print_test("POST /api/resources/download (with email)", False, f"Exception: {str(e)}")
        results.append(False)
    
    # Test 7c: Valid resource download (without email - optional)
    try:
        payload = {
            "title": "AI Implementation Guide"
        }
        response = requests.post(f"{BASE_URL}/resources/download", json=payload, timeout=10)
        data = response.json()
        
        passed = response.status_code == 200 and data.get('ok') == True
        print_test(
            "POST /api/resources/download (without email)",
            passed,
            f"Status: {response.status_code}, Response: {json.dumps(data, indent=2)}"
        )
        results.append(passed)
    except Exception as e:
        print_test("POST /api/resources/download (without email)", False, f"Exception: {str(e)}")
        results.append(False)
    
    return all(results)

def main():
    """Run all backend API tests"""
    print("\n" + "=" * 60)
    print("ASANYX ANALYTICS - BACKEND API TEST SUITE")
    print("=" * 60)
    print(f"Base URL: {BASE_URL}")
    print(f"Test Time: {datetime.now().isoformat()}")
    print("=" * 60 + "\n")
    
    results = {
        "Root API Endpoint": test_root_endpoint(),
        "Health Check": test_health_endpoint(),
        "Contact Form": test_contact_form(),
        "Consultation Booking": test_consultation_booking(),
        "Newsletter Subscription": test_newsletter_subscription(),
        "Career Application": test_careers_application(),
        "Resource Download": test_resources_download()
    }
    
    # Summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    passed_count = sum(1 for v in results.values() if v)
    total_count = len(results)
    
    for test_name, passed in results.items():
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"{status} | {test_name}")
    
    print("=" * 60)
    print(f"TOTAL: {passed_count}/{total_count} tests passed")
    print("=" * 60 + "\n")
    
    # Exit with appropriate code
    sys.exit(0 if all(results.values()) else 1)

if __name__ == "__main__":
    main()
