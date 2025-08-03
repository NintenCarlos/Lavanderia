from flask import jsonify, Blueprint, request
from app.controllers.client_controller import create_client, search_client_by_name, search_client_by_phone, search_clients, update_client, delete_client

client_bp = Blueprint("client_bp", __name__, url_prefix="/clients")

@client_bp.route("/create", methods=["POST"])
def create(): 
    data = request.json
    
    name = data.get('name')
    phone_number = data.get('phone_number')
    address = data.get('address')
    
    if not name or not phone_number or not address: 
        return  jsonify ({
            "errror": "Los datos básicos de un cliente son obligatorios."
        }), 400
        
    Client = create_client(name, phone_number, address)
    return jsonify({
        "msg": "Cliente creado con éxtio",
        "client": Client.to_dict()
    }), 200
    
@client_bp.route('/search', methods = ["GET"])
def search():
    filt = request.args.get("filter")
    param = request.args.get("parameter")
    
    if filt and param: 
        if filt == "name":
            clients = search_client_by_name(param)
        elif filt == "phone":
            clients = search_client_by_phone(param)
        else: 
            return jsonify({
                "err": "Filtro desconocido."
            }), 400
    else: 
        clients = search_clients()
    return [client.to_dict() for client in clients]

@client_bp.route("/update/<int:client_id>", methods=["PUT"])
def update(client_id):
    data = request.json
    
    client = update_client(client_id, data)
    
    if not client: 
        return jsonify({
            "error": "Cliente no encontrado"
        }), 400
        
    return jsonify({
        "msg": "Cliente actualizado con éxito"
    }), 200
    
@client_bp.route("/delete/<int:client_id>", methods=["DELETE"])
def delete(client_id): 
    client = delete_client(client_id)
    
    if not client: 
        return jsonify({
            "error": "Cliente no encontrado"
        }), 400
    
    return jsonify({
        "msg": "Cliente eliminado con éxito"
    }), 200