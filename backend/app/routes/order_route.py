from flask import Blueprint, jsonify, request
from app.controllers.order_controller import create_order, create_order_detail, add_garment, add_service, get_order_detail, get_counting, get_orders_dashboard, get_pending_orders_dashboard
import datetime 

order_bp = Blueprint("order_bp", __name__, url_prefix="/orders")

@order_bp.route("/create", methods=["POST"])
def create(): 
    data = request.json
    print(1) 
    splited_date = data["estimated_delivery_date"].split("-")
    date = datetime.date(int(splited_date[0]), int(splited_date[1]), int(splited_date[2]))
    order = create_order(
        client_id= data["client_id"],
        user_id= data["user_id"],
        estimated_date= date,
        total_price= data["total"]
        ) 
    print("Orden", order.to_dict())
    
    for garment in data["garments"] : 
        new_garment = add_garment(
            order_id= order.id,
            type= garment["type"], 
            description= garment["description"],
            observation= garment["observation"]
        )
        
        for service in garment["services"]: 
            new_service = add_service(
                name=service["name"],
                description= "Descripción Momentanea",
                price= service["unitPrice"]
            )
                        
            create_order_detail(
                order_id=order.id,
                garment_id=new_garment.id, 
                service_id= new_service.id, 
                quantity=service["quantity"])
    
    return jsonify({
        "msg": "Orden creada con éxito.",
        "order": order.to_dict()
    }), 200
            
@order_bp.route("/get-order-detail/<int:order_id>", methods=["GET"])
def create_ord_det(order_id): 
    
    try:
        order = get_order_detail(order_id)
        
        return jsonify({
            "msg": "Detalle de orden obtenido.",
            "order": order
        }), 200
        
    except Exception as e:
        return jsonify({
            "msg": "Ocurrió un error",
            "err": str(e)
        }), 500
        
@order_bp.route("/get-order-dashboard", methods=["GET"])
def get_orders_dash(): 
    pagination = int(request.args.get("pagination"))
    
    try: 
        data = get_orders_dashboard(pagination)
        return jsonify(data), 200
    
    except Exception as e: 
        print("Error al obtener las ordenes")
        print(f"Error: {e}")
        return jsonify({
            "err": "Error al obtener las ordenes"
        }), 200
  
@order_bp.route("/get-order-pending-dashboard", methods=["GET"])
def get_orders_pending(): 
    pagination = int(request.args.get("pagination"))
    
    try: 
        data = get_pending_orders_dashboard(pagination)
        return jsonify(data), 200
    
    except Exception as e: 
        print("Error al obtener las ordenes")
        print(f"Error: {e}")
        return jsonify({
            "err": "Error al obtener las ordenes"
        }), 200
     
@order_bp.route("/get-order-counting", methods=["GET"])
def get_counting_endpoint(): 
    try: 
        data = get_counting()
        return jsonify(data), 200
    
    except Exception as e: 
        print("Error al obtener las ordenes")
        print(f"Error: {e}")
        return jsonify({
            "err": "Error al obtener las ordenes"
        }), 400
