from app.database.db import db

class OrderDetail(db.Model): 
    __tablename__ = "order_detail"
    
    id = db.Column(db.Integer, primary_key=True)
    garment_id = db.Column(db.Integer, db.ForeignKey("garments.id"), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey("services.id"), nullable=False)
    
    quantity = db.Column(db.Integer, nullable=False)
    
    def to_dict (self):
        return self.__dict__
        """ oderder_detail = {
            'id': self.id,
            'garment_id': self.garment_id,
            'service_id': self.service_id,
            'quantity': self.quantity
        }
        
        return oderder_detail """
    
    