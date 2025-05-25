from config import db

class Users(db.Model):
    id = db.Column(db.Integer,primary_key = True)
    name = db.Column(db.String(80), unique = False, nullable = False)
    password = db.Column(db.String(80), unique = True, nullable = False)

class Channels(db.Model):
    id = db.Column(db.Integer,primary_key = True)
    name = db.Column(db.String(80), nullable = False)
    user1 = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    user2 = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    user3 = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    user4 = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'user1': self.user1,
            'user2': self.user2,
            'user3': self.user3,
            'user4': self.user4
        }

class Messages(db.Model):
    id = db.Column(db.Integer,primary_key = True)
    channel_id = db.Column(db.Integer, db.ForeignKey('channels.id'), nullable = False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)
    message = db.Column(db.String(500), nullable = False)
    timestamp = db.Column(db.DateTime, server_default=db.func.now(), nullable = False)

    channel = db.relationship('Channels', backref='messages')
    user = db.relationship('Users', backref='messages')

