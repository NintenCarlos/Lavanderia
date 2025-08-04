from flask import Blueprint, request, jsonify
from app.controllers.service_controller import create_service, get_all_services, get_service, update_services, delete_service

service_bp = Blueprint("service_bp", __name__, url_prefix="/service")

@service_bp.route("/create", methods=["POST"])
def create(): 
    data = request.json
    service = create_service(name= data["name"], description= data["description"], price=data["price"])
    return jsonify({
      "msg": "Servicio Creado con éxito",
      "service": service.to_dict()
    })
    
@service_bp.route("/get-all", methods=["GET"])
def get_all(): 
    services = get_all_services()
    return jsonify({
        "msg": "Listado de servicios obtenidos con éxito.",
        "services": services
    }), 200
    
@service_bp.route("/update/<int:service_id>", methods=["PUT"])
def update(service_id):
    data = request.json
    service = update_services(service_id, data)
    
    return jsonify({
        "msg": "Servicio actualizado con éxito",
        "service_id": service.id
    }), 200
    
@service_bp.route("/delete/<int:service_id>", methods=["DELETE"])
def delete(service_id): 
    service = delete_service(service_id)
    return jsonify({
        "msg": "Servicio elimnado con éxito",
        "service": service.to_dict()
    }), 200