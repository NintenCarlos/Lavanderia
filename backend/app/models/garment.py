from app.database.db import db

class Garment(db.Model): 
    __tablename__ = "garments"
    
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'))
    type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200))
    observation = db.Column(db.String(200))
    
    order_detail = db.relationship('OrderDetail', backref='garment', lazy=True)
        
    def to_dict (self):
        garment = {
            "id": self.id,
            "order_id": self.order_id,
            "type": self.type,
            "description": self.description,
            "observation": self.observation
        }
        
        
        return garment
        