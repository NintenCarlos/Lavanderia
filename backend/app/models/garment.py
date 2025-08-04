from app.database.db import db

class Garment(db.Model): 
    __tablename__ = "garments"
    
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200))
    observation = db.Column(db.String(200))
        
    def to_dict (self):
        garment = {
            "id": self.id,
            "type": self.type,
            "description": self.description,
            "observation": self.observation
        }
        
        return garment
        