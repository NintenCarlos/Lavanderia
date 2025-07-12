from app.database.db import db

class Service(db.Model): 
    __tablename__ = "services"
    
    id = db.Column(db.Integer, primary_key=True)
    
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200))
    price = db.Column(db.Float, nullable=False)
    
    garment_link = db.relationship("OrderDetail", backref="service", lazy=True)
    
    def to_dict (self, garment_link:bool=False):
       return self.__dict__
       """  service = {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price
        }
        
        if garment_link: 
            service['garment_link'] = self.garment_link
        return service """
        