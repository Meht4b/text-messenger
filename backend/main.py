from flask import request, jsonify,session
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from config import app, db,jwt
from models import Channels,Messages, Users

import bcrypt



@app.route('/create_user', methods=['POST'])
def add_user():
    data = request.get_json()
    name = data.get('name')
    password = data.get('password')

    if not name or not password:
        return jsonify({"error": "Name and password are required"}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    try:

        new_user = Users(name=name, password=hashed_password.decode('utf-8'))
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User added successfully", "user": new_user.to_json()}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
@app.route('/get_users', methods=['GET'])
def get_users():
    try:
        users = Users.query.all()
        json_users = list(map(lambda x: x.to_json(), users))

        return jsonify({"users": json_users})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/check_password', methods=['POST'])
def check_password():
    data = request.get_json()
    name = data.get('name')
    password = data.get('password')

    if not name or not password:
        return jsonify({"error": "Name and password are required"}), 400

    user = Users.query.filter_by(name=name).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    if bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return jsonify({"message": "Password is correct", "acces_token": create_access_token(identity=user.id)
}), 200
    else:
        return jsonify({"error": "Incorrect password"}), 401

@app.route('/create_channel', methods=['POST'])
def create_channel():
    data = request.get_json()
    name = data.get('name')
    user_ids = data.get('user_ids')


    if not name or not user_ids or len(user_ids) != 4:
        return jsonify({"error": "Name and exactly four user IDs are required"}), 400

    try:
        new_channel = Channels(name=name, user1=user_ids[0])
        user_count = 1
        for i in range(1, 4):
            if user_ids[i]:
                setattr(new_channel, f'user{i+1}', user_ids[i])



        db.session.add(new_channel)
        db.session.commit()

        return jsonify({"message": "Channel created successfully", "channel": new_channel.to_json()}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/update_channel', methods=['PATCH'])
def update_channel():
    data = request.get_json()
    channel_id = data.get('channel_id')


    if not channel_id or not user_ids or len(user_ids) != 4:
        return jsonify({"error": "Channel ID and exactly four user IDs are required"}), 400

    try:
        channel = Channels.query.get(channel_id)
        if not channel:
            return jsonify({"error": "Channel not found"}), 404

        user_count = 0
        for i in range(4):
            if user_ids[i]:
                setattr(channel, f'user{i+1}', user_ids[i])


        db.session.commit()

        return jsonify({"message": "Channel updated successfully", "channel": channel.to_json()}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/get_channels/<int:user_id>', methods=['GET'])
def get_channels(user_id):
    try:
        channels = Channels.query.filter(
            (Channels.user1 == user_id) |
            (Channels.user2 == user_id) |
            (Channels.user3 == user_id) |
            (Channels.user4 == user_id)
        ).all()
        json_channels = list(map(lambda x: x.to_json(),channels))

        return jsonify({"channels" : json_channels})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route('/send_message', methods=['POST'])
def send_message():
    data = request.get_json()
    channel_id = data.get('channel_id')
    user_id = data.get('user_id')
    message = data.get('message')

    if not channel_id or not user_id or not message:
        return jsonify({"error": "Channel ID, User ID, and message are required"}), 400

    try:
        new_message = Messages(channel_id=channel_id, user_id=user_id, message=message)
        db.session.add(new_message)
        db.session.commit()

        return jsonify({"message": "Message sent successfully", "message_data": new_message.to_json()}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/get_messages/<int:channel_id>/<int:last_read>', methods=['GET'])
def get_messages(channel_id,last_read):
    messages = Messages.query.filter(
        Messages.channel_id == channel_id,
        Messages.id > last_read
    ).all()

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