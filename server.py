from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
from datetime import datetime
import json

app = Flask(__name__)
CORS(app)

DB_PATH = 'antworten.db'

@app.route('/fragebogen', methods=['POST'])
def fragebogen_speichern():
    data = request.get_json()
    struktur = data.get('strukturAntworten')
    antworten = data.get('antworten')

    print("📥 Strukturantworten erhalten:", struktur)
    print("📊 Antwortdaten erhalten:", antworten)

    if not antworten:
        return jsonify({'status': 'error', 'message': 'Keine Antworten erhalten'}), 400

    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute(
        "INSERT INTO frageboegen (timestamp, struktur_daten, antworten) VALUES (?, ?, ?)",
        (
            datetime.now().isoformat(),
            json.dumps(struktur, ensure_ascii=False),
            json.dumps(antworten, ensure_ascii=False)
        )
    )
    conn.commit()
    conn.close()

    return jsonify({'status': 'success'}), 200

if __name__ == '__main__':
    app.run(debug=True)