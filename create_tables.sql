PRAGMA foreign_keys = ON;

-- USERS
CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TEXT NOT NULL
);

-- URL TARGETS
CREATE TABLE IF NOT EXISTS url_targets (
    target_id INTEGER PRIMARY KEY,
    url TEXT NOT NULL,
    url_type TEXT,
    protocol TEXT,
    domain TEXT,
    path TEXT
);

-- TARGETS
CREATE TABLE IF NOT EXISTS targets (
    target_id INTEGER PRIMARY KEY AUTOINCREMENT,
    target_type TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- SCANS
CREATE TABLE IF NOT EXISTS scans (
    scan_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    target_id INTEGER NOT NULL,
    profile_id INTEGER NOT NULL,
    schedule_id INTEGER NOT NULL,
    status TEXT NOT NULL,
    started_at TEXT,
    finished_at TEXT,
    duration REAL,
    total_findings INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (target_id) REFERENCES url_targets(target_id)
);

-- FINDINGS
CREATE TABLE IF NOT EXISTS findings (
    scan_id INTEGER NOT NULL,
    finding_no INTEGER NOT NULL,
    title TEXT NOT NULL,
    severity TEXT NOT NULL,
    cvss_score REAL CHECK (cvss_score BETWEEN 0 AND 10),
    description TEXT,
    owasp_code INTEGER,
    cwe_id INTEGER,
    detected_at TEXT NOT NULL,
    PRIMARY KEY (scan_id, finding_no),
    FOREIGN KEY (scan_id) REFERENCES scans(scan_id) ON DELETE CASCADE
);

-- APK FILES
CREATE TABLE IF NOT EXISTS apk_files (
    target_id INTEGER PRIMARY KEY,
    file_name TEXT NOT NULL,
    file_size INTEGER,
    package_name TEXT,
    app_version TEXT,
    permissions TEXT,
    FOREIGN KEY (target_id) REFERENCES targets(target_id)
);

-- ANOMALY SCORE
CREATE TABLE IF NOT EXISTS anomaly_score (
    scan_id INTEGER PRIMARY KEY,
    anomaly_score REAL NOT NULL,
    computed_at TEXT NOT NULL,
    FOREIGN KEY (scan_id) REFERENCES scans(scan_id)
);

-- REPORTS
CREATE TABLE IF NOT EXISTS reports (
    report_id INTEGER PRIMARY KEY AUTOINCREMENT,
    scan_id INTEGER NOT NULL,
    report_type TEXT NOT NULL,
    generated_at TEXT NOT NULL,
    overall_severity TEXT,
    FOREIGN KEY (scan_id) REFERENCES scans(scan_id)
);

-- REPORT ITEMS
CREATE TABLE IF NOT EXISTS report_items (
    report_id INTEGER NOT NULL,
    item_no INTEGER NOT NULL,
    scan_id INTEGER NOT NULL,
    finding_no INTEGER NOT NULL,
    status TEXT NOT NULL,
    PRIMARY KEY (report_id, item_no),
    FOREIGN KEY (report_id) REFERENCES reports(report_id),
    FOREIGN KEY (scan_id) REFERENCES scans(scan_id),
    FOREIGN KEY (scan_id, finding_no)
        REFERENCES findings(scan_id, finding_no)
);

-- REMEDIATIONS
CREATE TABLE IF NOT EXISTS remediations (
    remediation_id INTEGER PRIMARY KEY AUTOINCREMENT,
    scan_id INTEGER NOT NULL,
    finding_no INTEGER NOT NULL,
    source TEXT,
    text TEXT NOT NULL,
    reference_url TEXT,
    FOREIGN KEY (scan_id) REFERENCES scans(scan_id),
    FOREIGN KEY (scan_id, finding_no)
        REFERENCES findings(scan_id, finding_no)
);

-- EVIDENCE
CREATE TABLE IF NOT EXISTS evidence (
    evidence_id INTEGER PRIMARY KEY AUTOINCREMENT,
    scan_id INTEGER NOT NULL,
    finding_no INTEGER NOT NULL,
    path TEXT NOT NULL,
    FOREIGN KEY (scan_id) REFERENCES scans(scan_id),
    FOREIGN KEY (scan_id, finding_no)
        REFERENCES findings(scan_id, finding_no)
);

-- AFFECTED ENDPOINTS
CREATE TABLE IF NOT EXISTS affected_endpoints (
    endpoint_id INTEGER PRIMARY KEY AUTOINCREMENT,
    scan_id INTEGER NOT NULL,
    finding_no INTEGER NOT NULL,
    method TEXT,
    path TEXT NOT NULL,
    status_code INTEGER,
    FOREIGN KEY (scan_id) REFERENCES scans(scan_id),
    FOREIGN KEY (scan_id, finding_no)
        REFERENCES findings(scan_id, finding_no)
);

-- SCHEDULE
CREATE TABLE IF NOT EXISTS schedule (
    schedule_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    timezone TEXT NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- NOTIFICATIONS
CREATE TABLE IF NOT EXISTS notifications (
    notification_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    event_type TEXT NOT NULL,
    sent_at TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
