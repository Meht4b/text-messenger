from flask import request, jsonify
from config import app, db
from models import Channels,Messages, Users


@app.route('/get_channels/<user_id>', methods=['GET'])
def get_channels(user_id):
    channels = Channels.query.filter(
        (Channels.user1 == user_id) |
        (Channels.user2 == user_id) |
        (Channels.user3 == user_id) |
        (Channels.user4 == user_id)
    ).all()
    json_channels = list(map(lambda x: x.to_json(),channels))

    return jsonify({"channels" : json_channels})
    
@app.route('/get_messages/<channel_id>', methods=['GET'])
def get_messages(channel_id):
    messages = Messages.query.filter_by(channel_id=channel_id).all()
    json_messages = list(map(lambda x: {
        'id': x.id,
        'user_id': x.user_id,
        'message': x.message,
        'timestamp': x.timestamp.isoformat()
    }, messages))

    return jsonify({"messages": json_messages})


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)