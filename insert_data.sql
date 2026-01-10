PRAGMA foreign_keys = ON;

-- ================= USERS =================
INSERT INTO users (user_id, name, email, password_hash, status, created_at) VALUES
(1, 'Admin User', 'admin@example.com', 'hash123admin', 'ACTIVE', '2026-01-01'),
(2, 'Normal User', 'user@example.com', 'hash123user', 'ACTIVE', '2026-01-02');

-- ================= URL TARGETS =================
INSERT INTO url_targets (target_id, url, url_type, protocol, domain, path) VALUES
(1, 'https://example.com/login', 'WEB', 'HTTPS', 'example.com', '/login'),
(2, 'http://testsite.com/api', 'API', 'HTTP', 'testsite.com', '/api');

-- ================= TARGETS =================
INSERT INTO targets (target_id, target_type, user_id) VALUES
(1, 'WEB', 1),
(2, 'API', 2);

-- ================= SCANS =================
INSERT INTO scans (
    scan_id, user_id, target_id, profile_id, schedule_id,
    status, started_at, finished_at, duration, total_findings
) VALUES
(1, 1, 1, 5, 10, 'COMPLETED', '2026-01-01 10:00', '2026-01-01 10:05', 5.0, 1),
(2, 2, 2, 6, 11, 'RUNNING', '2026-01-02 11:00', NULL, NULL, 0);

-- ================= FINDINGS =================
INSERT INTO findings (
    scan_id, finding_no, title, severity, cvss_score,
    description, owasp_code, cwe_id, detected_at
) VALUES
(1, 1, 'SQL Injection', 'High', 9.1, 'User input not sanitized', 1, 89, '2026-01-01');

-- ================= APK FILES =================
INSERT INTO apk_files
(target_id, file_name, file_size, package_name, app_version, permissions)
VALUES
(1, 'secureguard.apk', 20485760, 'com.secure.guard', '1.0.0', 'INTERNET,CAMERA');

-- ================= ANOMALY SCORE =================
INSERT INTO anomaly_score (scan_id, anomaly_score, computed_at)
VALUES (1, 0.85, datetime('now'));

-- ================= EVIDENCE =================
INSERT INTO evidence (scan_id, finding_no, path)
VALUES (1, 1, '/login');

-- ================= AFFECTED ENDPOINTS =================
INSERT INTO affected_endpoints
(scan_id, finding_no, method, path, status_code)
VALUES (1, 1, 'POST', '/login', 500);

-- ================= REMEDIATIONS =================
INSERT INTO remediations
(scan_id, finding_no, source, text, reference_url)
VALUES (1, 1, 'OWASP', 'Use prepared statements', 'https://owasp.org');

-- ================= REPORTS =================
INSERT INTO reports
(report_id, scan_id, report_type, generated_at, overall_severity)
VALUES (1, 1, 'PDF', datetime('now'), 'HIGH');

-- ================= REPORT ITEMS =================
INSERT INTO report_items
(report_id, item_no, scan_id, finding_no, status)
VALUES (1, 1, 1, 1, 'OPEN');

-- ================= SCHEDULE =================
INSERT INTO schedule (schedule_id, user_id, timezone, status)
VALUES (1, 1, 'Asia/Kolkata', 'ACTIVE');

-- ================= NOTIFICATIONS =================
INSERT INTO notifications (notification_id, user_id, event_type, sent_at)
VALUES (1, 1, 'SCAN_COMPLETED', datetime('now'));

