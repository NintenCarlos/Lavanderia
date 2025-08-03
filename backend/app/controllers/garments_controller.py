from app import db 
from app.models.garment import Garment

def create_garment(type, description, observation):
    new_garment = Garment(type = type, description = description, observation = observation)
    
    db.session.add(new_garment)
    db.session.commit()
    return new_garment
    

def update_garments(garment_id, updated_data):
    garment = Garment.query.get(garment_id)
    
    if not garment: 
        return None
    
    for key, value in updated_data.items():
        setattr(garment, key, value)
        
    db.session.commit()
    return garment

def delete_garment(garment_id): 
    garment = Garment.query.get(garment_id)
    
    if not garment: 
        return None
    
    db.session.delete(garment)
    db.session.commit()
    return garment

def get_garment(garment_id):
    garment = Garment.query.get(garment_id)
    
    if not garment: 
        return None
    
    return garment

def get_all_garments(): 
    garments = Garment.query.filter().all()
    
    if not garments: 
        return None
    
    data = [garment.to_dict() for garment in garments]
    return data    
    
    