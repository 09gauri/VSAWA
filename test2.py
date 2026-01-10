import sqlite3

DB_NAME = "secure_guard.db"

def run_sql(cursor, filename):
    with open(filename, "r") as f:
        cursor.executescript(f.read())

def main():
    conn = sqlite3.connect(DB_NAME)
    conn.execute("PRAGMA foreign_keys = ON")
    cur = conn.cursor()

    print("Creating tables...")
    run_sql(cur, "create_tables.sql")

    print("Inserting data...")
    run_sql(cur, "insert_data.sql")

    print("\nReports:", cur.execute("SELECT * FROM reports").fetchall())
    print("Evidence:", cur.execute("SELECT * FROM evidence").fetchall())
    print("Remediations:", cur.execute("SELECT * FROM remediations").fetchall())
    print("Schedule:", cur.execute("SELECT * FROM schedule").fetchall())
    print("Notifications:", cur.execute("SELECT * FROM notifications").fetchall())

    print("\nFindings:", cur.execute("SELECT * FROM findings").fetchall())
    print("Scans:", cur.execute("SELECT * FROM scans").fetchall())
    print("URL Targets:", cur.execute("SELECT * FROM url_targets").fetchall())
    print("Users:", cur.execute("SELECT * FROM users").fetchall())

    conn.commit()
    conn.close()
    print("\n✅ DB tested successfully")

if __name__ == "__main__":
    main()
