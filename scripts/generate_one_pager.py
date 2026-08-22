"""
ASANYX Analytics — Company One-Pager PDF Generator

Uses ReportLab to produce a single-page A4 marketing/pitch handout at:
  /app/public/brand/documents/ASANYX_Company_One_Pager.pdf

Re-run:  python3 /app/scripts/generate_one_pager.py
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader

OUT = "/app/public/brand/documents/ASANYX_Company_One_Pager.pdf"
LOGO_WHITE = "/app/public/brand/logos/asanyx-logo-horizontal-on-dark.png"
LOGO_COLOR = "/app/public/brand/logos/asanyx-logo-horizontal-color.png"

os.makedirs(os.path.dirname(OUT), exist_ok=True)

# Brand colours — official ASANYX palette
DEEP_BLUE  = HexColor("#0B2A6B")   # Asanyx Navy
BRAND_BLUE = HexColor("#1257C7")   # Asanyx Blue
CYAN       = HexColor("#12B6E8")   # Signal Cyan
EMERALD    = HexColor("#059669")   # Emerald
TEXT_DARK  = HexColor("#0B1B3A")   # Ink
MUTED      = HexColor("#6B7A99")   # Slate Gray
BORDER     = HexColor("#DEE4F0")   # Border Gray
SOFT       = HexColor("#F7F9FC")   # Paper White
MIDNIGHT   = HexColor("#060B1A")   # Midnight
WHITE      = HexColor("#FFFFFF")


def draw_wrapped(c, text, x, y, max_width, font="Helvetica", size=9, leading=12, color=TEXT_DARK):
    """Draw wrapped text top-down starting at (x, y). Returns final y position."""
    c.setFont(font, size)
    c.setFillColor(color)
    words = text.split()
    line = ""
    cur_y = y
    for w in words:
        test = (line + " " + w).strip()
        if c.stringWidth(test, font, size) <= max_width:
            line = test
        else:
            c.drawString(x, cur_y, line)
            cur_y -= leading
            line = w
    if line:
        c.drawString(x, cur_y, line)
        cur_y -= leading
    return cur_y


def draw_bullets(c, items, x, y, max_width, size=8.5, leading=12, bullet_color=BRAND_BLUE, text_color=TEXT_DARK):
    for it in items:
        # Bullet dot
        c.setFillColor(bullet_color)
        c.circle(x + 2, y + 3.2, 1.6, stroke=0, fill=1)
        c.setFillColor(text_color)
        c.setFont("Helvetica", size)
        # single-line assumed short; wrap manually if too long
        available = max_width - 12
        words = it.split()
        line = ""
        cy = y
        first = True
        for w in words:
            test = (line + " " + w).strip()
            if c.stringWidth(test, "Helvetica", size) <= available:
                line = test
            else:
                c.drawString(x + 10, cy, line)
                cy -= leading
                line = w
                first = False
        if line:
            c.drawString(x + 10, cy, line)
            cy -= leading
        y = cy - 1
    return y


def build():
    W, H = A4
    c = canvas.Canvas(OUT, pagesize=A4)
    c.setTitle("ASANYX Analytics — Company One-Pager")
    c.setAuthor("ASANYX Analytics Private Limited")

    # ============ HEADER (dark band) ============
    header_h = 90
    c.setFillColor(DEEP_BLUE)
    c.rect(0, H - header_h, W, header_h, stroke=0, fill=1)
    # Accent line
    c.setFillColor(BRAND_BLUE)
    c.rect(0, H - header_h - 3, W, 3, stroke=0, fill=1)

    # Logo on left
    try:
        img = ImageReader(LOGO_WHITE)
        iw, ih = img.getSize()
        target_h = 40
        target_w = target_h * (iw / ih)
        c.drawImage(img, 36, H - header_h + (header_h - target_h) / 2,
                    width=target_w, height=target_h, mask="auto")
    except Exception as e:
        print("logo failed:", e)
        c.setFillColor(WHITE); c.setFont("Helvetica-Bold", 18)
        c.drawString(36, H - 55, "ASANYX ANALYTICS")

    # Contact on right
    contact_lines = [
        ("www.asanyxanalytics.com", "Helvetica-Bold", 9, WHITE),
        ("hello@asanyxanalytics.com", "Helvetica", 8.5, HexColor("#CBD5E1")),
        ("India · Global Delivery", "Helvetica", 8.5, HexColor("#94A3B8")),
    ]
    cy = H - 40
    for txt, font, size, color in contact_lines:
        c.setFont(font, size); c.setFillColor(color)
        tw = c.stringWidth(txt, font, size)
        c.drawString(W - 36 - tw, cy, txt)
        cy -= 12

    # ============ HERO STATEMENT ============
    y = H - header_h - 40
    c.setFillColor(BRAND_BLUE); c.setFont("Helvetica-Bold", 8)
    c.drawString(36, y, "A BOUTIQUE DATA & BI CONSULTING PRACTICE")
    y -= 22

    c.setFillColor(DEEP_BLUE); c.setFont("Helvetica-Bold", 20)
    c.drawString(36, y, "Turning data into decisions that drive growth.")
    y -= 18

    intro = (
        "ASANYX Analytics designs, builds and operates modern Business Intelligence and data "
        "platforms for enterprises and scale-ups. Practitioner-led, outcome-obsessed and "
        "focused on the modern Microsoft data stack."
    )
    y = draw_wrapped(c, intro, 36, y, W - 72, font="Helvetica", size=10, leading=14, color=TEXT_DARK)
    y -= 8

    # ============ PRACTICES (4 cards in a row) ============
    practices = [
        ("Business Intelligence", "Enterprise dashboards, semantic models and executive reporting on Power BI and Microsoft Fabric."),
        ("Data Engineering",      "Modern data platforms and pipelines on Azure, Fabric, Databricks, Snowflake and GCP."),
        ("Migration Services",    "Structured, low-risk migrations from Tableau, Qlik and Looker to Power BI and Fabric."),
        ("Consulting & Delivery", "Project delivery, dedicated resources, staff augmentation and managed analytics services."),
    ]
    card_w = (W - 72 - 3 * 8) / 4
    card_h = 88
    x = 36
    for title, body in practices:
        # Card
        c.setFillColor(SOFT); c.setStrokeColor(BORDER); c.setLineWidth(0.5)
        c.roundRect(x, y - card_h, card_w, card_h, 6, stroke=1, fill=1)
        # Accent bar
        c.setFillColor(BRAND_BLUE)
        c.rect(x, y - card_h, 3, card_h, stroke=0, fill=1)
        # Title
        c.setFillColor(DEEP_BLUE); c.setFont("Helvetica-Bold", 10)
        c.drawString(x + 12, y - 16, title)
        # Body
        draw_wrapped(c, body, x + 12, y - 30, card_w - 20,
                     font="Helvetica", size=8, leading=10.5, color=MUTED)
        x += card_w + 8
    y -= card_h + 18

    # ============ TWO COLUMN: What we do best  /  Outcomes ============
    col_w = (W - 72 - 20) / 2
    left_x = 36
    right_x = 36 + col_w + 20
    col_top = y

    # LEFT — expertise bullets
    c.setFillColor(BRAND_BLUE); c.setFont("Helvetica-Bold", 8)
    c.drawString(left_x, col_top, "WHAT WE DO BEST")
    c.setFillColor(DEEP_BLUE); c.setFont("Helvetica-Bold", 13)
    c.drawString(left_x, col_top - 16, "Deep, focused expertise")
    lst = [
        "Power BI, Microsoft Fabric & DAX semantic modelling",
        "Data engineering on Azure, Databricks, Snowflake & GCP",
        "Tableau · Qlik · Looker → Power BI migration",
        "Governed self-service and enterprise BI",
        "Analytics engineering, dbt & modern data stack",
        "Executive-grade dashboards and storytelling",
    ]
    ly = col_top - 34
    ly = draw_bullets(c, lst, left_x, ly, col_w, size=9, leading=11.5)

    # RIGHT — outcomes
    c.setFillColor(BRAND_BLUE); c.setFont("Helvetica-Bold", 8)
    c.drawString(right_x, col_top, "OUTCOMES CLIENTS SEE")
    c.setFillColor(DEEP_BLUE); c.setFont("Helvetica-Bold", 13)
    c.drawString(right_x, col_top - 16, "Numbers, not just dashboards")
    metrics = [
        ("40-60%", "faster report load times post-migration"),
        ("25-45%", "reduction in annual BI licensing cost"),
        ("2-5x",   "consolidation of legacy reports"),
        ("90%+",   "business user adoption within 90 days"),
    ]
    my = col_top - 36
    for k, v in metrics:
        c.setFillColor(DEEP_BLUE); c.setFont("Helvetica-Bold", 16)
        c.drawString(right_x, my, k)
        c.setFillColor(MUTED); c.setFont("Helvetica", 9)
        c.drawString(right_x + 60, my, v)
        my -= 18

    y = min(ly, my) - 8

    # ============ WHY ASANYX (3 columns) ============
    why_top = y
    c.setFillColor(BRAND_BLUE); c.setFont("Helvetica-Bold", 8)
    c.drawString(36, why_top, "WHY ASANYX")
    c.setFillColor(DEEP_BLUE); c.setFont("Helvetica-Bold", 13)
    c.drawString(36, why_top - 16, "Boutique focus. Enterprise craft.")
    why = [
        ("Practitioner-led", "Every engagement is led by senior BI and data practitioners with enterprise delivery experience - no juniors, no hand-offs."),
        ("Outcome-obsessed", "We anchor programs to measurable business outcomes - cost saved, cycle time cut, decisions made - not dashboards shipped."),
        ("Boutique speed",   "Small, senior teams that move fast, communicate directly and stay accountable end-to-end."),
    ]
    ww = (W - 72 - 20) / 3
    wx = 36
    wy_start = why_top - 34
    for title, body in why:
        c.setFillColor(DEEP_BLUE); c.setFont("Helvetica-Bold", 10)
        c.drawString(wx, wy_start, title)
        draw_wrapped(c, body, wx, wy_start - 14, ww,
                     font="Helvetica", size=8.5, leading=11, color=MUTED)
        wx += ww + 10
    y = wy_start - 60

    # ============ ENGAGEMENT MODELS strip ============
    c.setFillColor(BRAND_BLUE); c.setFont("Helvetica-Bold", 8)
    c.drawString(36, y, "HOW WE ENGAGE")
    y -= 12
    models = [
        "Project-based delivery",
        "Dedicated remote resources",
        "Managed analytics services",
        "Consulting & advisory",
    ]
    c.setStrokeColor(BORDER); c.setLineWidth(0.5)
    c.line(36, y, W - 36, y)
    y -= 14
    mx = 36
    mw = (W - 72) / len(models)
    for m in models:
        c.setFillColor(DEEP_BLUE); c.setFont("Helvetica-Bold", 9)
        c.drawString(mx, y, m)
        mx += mw
    y -= 20

    # ============ FOOTER ============
    # divider
    c.setStrokeColor(BORDER); c.setLineWidth(0.5)
    c.line(36, 46, W - 36, 46)
    # Footer text
    c.setFillColor(MUTED); c.setFont("Helvetica", 8)
    c.drawString(36, 32, "ASANYX ANALYTICS PRIVATE LIMITED  ·  India · Global Delivery")
    right = "www.asanyxanalytics.com  ·  hello@asanyxanalytics.com"
    tw = c.stringWidth(right, "Helvetica", 8)
    c.drawString(W - 36 - tw, 32, right)

    c.setFillColor(HexColor("#94A3B8")); c.setFont("Helvetica", 7)
    c.drawString(36, 20, "© " + str(__import__('datetime').date.today().year) + " ASANYX Analytics. All rights reserved.  ·  Confidential company one-pager.")

    c.showPage()
    c.save()
    return OUT


if __name__ == "__main__":
    p = build()
    print("Generated:", p, "size:", os.path.getsize(p), "bytes")
