PRAGMA foreign_keys = ON;

CREATE TABLE findings (
    scan_id INTEGER NOT NULL,
    finding_no INTEGER NOT NULL,
    title TEXT NOT NULL,
    severity TEXT NOT NULL,
    cvss_score REAL CHECK (cvss_score BETWEEN 0 AND 10),
    description TEXT,
    owasp_code INTEGER,
    cwe_id INTEGER,
    detected_at TEXT NOT NULL,
    FOREIGN KEY (scan_id) REFERENCES scans(scan_id)
);

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

CREATE TABLE IF NOT EXISTS url_targets (
    target_id INTEGER PRIMARY KEY,
    url TEXT NOT NULL,
    url_type TEXT,
    protocol TEXT,
    domain TEXT,
    path TEXT
);

CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at TEXT NOT NULL
);
