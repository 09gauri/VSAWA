import json
from datetime import datetime
from rich.console import Console
from rich.panel import Panel
from rich.layout import Layout
from rich.pretty import Pretty

console = Console()

# Load data
with open("top10.json") as f:
    top10 = json.load(f)

with open("cwe.json") as f:
    cwe_data = json.load(f)

# Normalize for smart matching
def normalize(t):
    return t.lower().replace(" ", "").replace("-", "").replace("_", "")

# Sidebar
def build_sidebar():
    kb = "\n".join(top10.keys())
    cwes = "\n".join(list(cwe_data.keys())[:10]) + "\n..."
    return Panel(
        f"[bold cyan]KNOWLEDGE BASE[/bold cyan]\n{kb}\n\n"
        f"[bold yellow]CWE REGISTRY[/bold yellow]\n{cwes}",
        title="SEC_ENGINE_V1",
        border_style="green"
    )

# Search logic
def search(query):
    q = normalize(query)
    results = []
    idx = 1

    # 1) Search in CWE by name, alias, or ID
    for cwe_id, cwe in cwe_data.items():
        name_norm = normalize(cwe["name"])
        aliases = [normalize(a) for a in cwe.get("aliases", [])]

        if q in name_norm or q in normalize(cwe_id) or q in aliases:
            owasp = cwe["owasp"]
            vuln = top10[owasp]
            results.append({
                "id": f"VULN-{str(idx).zfill(3)}",
                "name": cwe["name"],
                "cwe": cwe_id,
                "severity": vuln["severity"],
                "mitigation": vuln["mitigation"]
            })
            return results

    # 2) Search in OWASP category name
    for key, vuln in top10.items():
        if q in normalize(vuln["name"]):
            main_cwe = vuln["related_cwe"][0]
            cwe_name = cwe_data[main_cwe]["name"] if main_cwe in cwe_data else vuln["name"]
            results.append({
                "id": f"VULN-{str(idx).zfill(3)}",
                "name": cwe_name,
                "cwe": main_cwe,
                "severity": vuln["severity"],
                "mitigation": vuln["mitigation"]
            })
            return results

    return results

# Output
def show_output(query):
    data = search(query)
    output = {
        "count": len(data),
        "results": data
    }
    console.print(f"[bold green][SUCCESS][/bold green] {datetime.now().isoformat()}")
    console.print(Pretty(output))

# Layout
layout = Layout()
layout.split_row(
    Layout(name="left", size=30),
    Layout(name="right")
)

layout["left"].update(build_sidebar())
layout["right"].update(
    Panel(
        "Type like:\n"
        "sql injection\n"
        "xss\n"
        "broken access control\n"
        "auth bypass\n"
        "Upper/lower case, space, dash – sab ignore hota hai.",
        border_style="blue"
    )
)

console.clear()
console.print(layout)

# Main loop
while True:
    q = console.input("[bold green]user@sec-engine:~$ [/bold green]")
    if q.lower() == "exit":
        break
    show_output(q)
