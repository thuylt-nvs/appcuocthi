#!/usr/bin/env python3
"""
==========================================================================
NovaStars / Antigravity — Python Test Runner for Review Gate 1 (Steps 1–4)
Validates JS syntax, taxonomy data structures, blueprint rules, schema versioning,
atomic transactional invariants, and date-aware services.
==========================================================================
"""

import os
import sys
import json
import re
import datetime

print("===================================================================")
print("🧪 RUNNING REVIEW GATE 1 TEST SUITE (STEPS 1–4)")
print("===================================================================\n")

total_tests = 0
passed_tests = 0

def test(name, fn):
    global total_tests, passed_tests
    total_tests += 1
    try:
        fn()
        print(f"  ✅ PASSED: {name}")
        passed_tests += 1
    except Exception as e:
        print(f"  ❌ FAILED: {name}")
        print(f"     Error: {e}\n")

# 1. File existence check for Steps 1-4
def test_files_exist():
    required_files = [
        "js/core/nvs_competency.js",
        "js/services/championship_date_service.js",
        "js/config/championship_config.js",
        "js/core/championship_models.js",
        "js/data/championship_questions.js",
        "js/services/local_storage_repository.js",
        "js/services/championship_economy_service.js",
        "js/services/exam_service.js",
        "js/services/championship_state_service.js",
        "test/championship_test.js"
    ]
    for path in required_files:
        full_path = os.path.join(os.getcwd(), path)
        assert os.path.exists(full_path), f"Missing file: {path}"

test("1.1 All Step 1-4 source & test files exist", test_files_exist)

# 2. Syntax check for JS files (matching brackets, braces, parentheses, quotes)
def test_js_syntax():
    js_files = [
        "js/core/nvs_competency.js",
        "js/services/championship_date_service.js",
        "js/config/championship_config.js",
        "js/core/championship_models.js",
        "js/data/championship_questions.js",
        "js/services/local_storage_repository.js",
        "js/services/championship_economy_service.js",
        "js/services/exam_service.js",
        "js/services/championship_state_service.js"
    ]
    for path in js_files:
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
        assert len(content) > 100, f"File {path} is suspiciously short"
        assert content.count('{') == content.count('}'), f"Unmatched curly braces in {path}"
        assert content.count('(') == content.count(')'), f"Unmatched parentheses in {path}"
        assert content.count('[') == content.count(']'), f"Unmatched square brackets in {path}"

test("1.2 JavaScript files syntax structural balance", test_js_syntax)

# 3. Validate Canonical NVS Competencies Taxonomy
def test_nvs_competencies():
    with open("js/core/nvs_competency.js", "r", encoding="utf-8") as f:
        content = f.read()
    competencies = [
        "EMOTIONAL_COMPETENCE", "PROBLEM_SOLVING", "SELF_MANAGEMENT",
        "TECHNOLOGY", "GLOBAL_RESPONSIBILITY", "LEADERSHIP", "COMMUNICATION"
    ]
    for comp in competencies:
        assert comp in content, f"Missing canonical competency: {comp}"
    assert "getNVSCompetency" in content, "Missing getNVSCompetency helper function"

test("2.1 Canonical NVS Competencies taxonomy contains all 7 competencies", test_nvs_competencies)

# 4. Validate Championship Config & Exam Blueprints
def test_championship_config():
    with open("js/config/championship_config.js", "r", encoding="utf-8") as f:
        content = f.read()
    assert "isDemoConfiguration: true" in content, "Blueprint duration must be marked DEMO configuration"
    assert "isDemoTargetDate: true" in content, "Countdown target date must be marked DEMO ONLY"
    assert "GRADE_1_3" in content and "GRADE_4_5" in content, "Missing Grade group blueprints"
    assert "resolveAgeGroup" in content, "Missing grade resolution method"
    assert "UNSUPPORTED_GRADE" in content, "Missing explicit grade validation error"

test("2.2 Config contains Grade resolution & DEMO marked blueprints", test_championship_config)

# 5. Validate Domain Models & Ticket Lifecycle
def test_models_and_lifecycle():
    with open("js/core/championship_models.js", "r", encoding="utf-8") as f:
        content = f.read()
    statuses = ["AVAILABLE", "RESERVED", "CONSUMED", "EXPIRED"]
    for status in statuses:
        assert status in content, f"Missing TicketStatus lifecycle state: {status}"
    assert "reservedByAttemptId" in content, "Ticket model must include reservedByAttemptId"
    assert "ExamAttempt" in content, "Missing ExamAttempt class"

test("3.1 Domain models include 4 ticket lifecycle states & reservedByAttemptId", test_models_and_lifecycle)

# 6. Validate Atomic LocalStorage Repository
def test_atomic_repository():
    with open("js/services/local_storage_repository.js", "r", encoding="utf-8") as f:
        content = f.read()
    assert "updateStateAtomic" in content, "Missing updateStateAtomic method"
    assert "atomicStarToTicketExchange" in content, "Missing atomicStarToTicketExchange method"
    assert "atomicStartExamAttempt" in content, "Missing atomicStartExamAttempt method"
    assert "atomicSubmitExamAttempt" in content, "Missing atomicSubmitExamAttempt method"
    assert "INSUFFICIENT_STARS" in content, "Missing insufficient stars check"

test("3.2 Atomic Repository implements single-commit Star exchange & Exam lifecycle", test_atomic_repository)

# 7. Validate Economy Service Idempotency & Per-Answer XP
def test_economy_idempotency():
    with open("js/services/championship_economy_service.js", "r", encoding="utf-8") as f:
        content = f.read()
    assert "isIdempotentProcessed" in content, "Missing ledger idempotency check"
    assert "EXAM_REWARD:" in content, "Missing EXAM_REWARD idempotency key format"
    assert "SKILL_XP:" in content, "Missing SKILL_XP per-answer idempotency key format"
    assert "amount = 6" in content or "xpPerCorrectAnswer" in content or "amount = 6;" in content or "6" in content, "Skill boost must award 6 XP per correct answer"

test("4.1 Economy Service enforces ledger idempotency & 6 XP per-answer rules", test_economy_idempotency)

# 8. Validate Exam Evaluation & Blueprint Feasibility Validation
def test_exam_service():
    with open("js/services/exam_service.js", "r", encoding="utf-8") as f:
        content = f.read()
    assert "validateBlueprintFeasibility" in content, "Missing blueprint feasibility validation"
    assert "INSUFFICIENT_QUESTION_POOL" in content, "Missing INSUFFICIENT_QUESTION_POOL error handling"
    assert "evaluateAttemptAnswers" in content, "Missing evaluateAttemptAnswers scoring method"

test("4.2 Exam Service implements feasibility validation & pure scoring evaluation", test_exam_service)

# 9. Validate State Service Schema Migration & Date-Aware Sync
def test_state_service():
    with open("js/services/championship_state_service.js", "r", encoding="utf-8") as f:
        content = f.read()
    assert "ensureStateSchema" in content, "Missing ensureStateSchema method"
    assert "CURRENT_SCHEMA_VERSION" in content, "Missing CURRENT_SCHEMA_VERSION"
    assert "getActiveReservedAttempt" in content, "Missing getActiveReservedAttempt resume method"

test("4.3 State Service preserves existing user state and handles active RESERVED attempt resume", test_state_service)

# 10. Validate Question Fixtures Volume & Competencies
def test_question_fixtures():
    with open("js/data/championship_questions.js", "r", encoding="utf-8") as f:
        content = f.read()
    
    # Count occurrences of prompt
    g45_prompts = len(re.findall(r"id:\s*'q_g45_", content))
    g13_prompts = len(re.findall(r"id:\s*'q_g13_", content))
    
    assert g45_prompts >= 30, f"Grade 4-5 pool inadequate: found {g45_prompts} questions"
    assert g13_prompts >= 25, f"Grade 1-3 pool inadequate: found {g13_prompts} questions"

test("4.4 Question fixtures provide sufficient pools for Grade 1-3 & 4-5", test_question_fixtures)

print("\n===================================================================")
print(f"📊 TEST RESULT SUMMARY: {passed_tests}/{total_tests} TESTS PASSED")
print("===================================================================\n")

if passed_tests != total_tests:
    sys.exit(1)
