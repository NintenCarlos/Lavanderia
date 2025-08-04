from flask import Blueprint, request, jsonify
from app.controllers.garments_controller import create_garment, update_garments, delete_garment, get_all_garments

garment_bp = Blueprint("garment_bp", __name__, url_prefix="/garments")

@garment_bp.route("/create", methods=["POST"])
def create(): 
    data = request.json
    garment = create_garment(data["type"], data["description"], data["observation"])
    return jsonify({
      "msg": "Prenda Creada con éxito",
      "garment": garment.to_dict()  
    })
    
@garment_bp.route("/get-all", methods=["GET"])
def get_all(): 
    garments = get_all_garments()
    return jsonify({
        "msg": "Listado de prendas obtenidas con éxito.",
        "garments": garments
    }), 200
    
@garment_bp.route("/update/<int:garment_id>", methods=["PUT"])
def update(garment_id):
    data = request.json
    garment = update_garments(garment_id, data)
    
    return jsonify({
        "msg": "Prenda actualizada con éxito",
        "garment_id": garment.id
    }), 200
    
@garment_bp.route("/delete/<int:garment_id>", methods=["DELETE"])
def delete(garment_id): 
    garment = delete_garment(garment_id)
    return jsonify({
        "msg": "Prenda elimnada con éxito",
        "garment": garment.to_dict()
    }), 200