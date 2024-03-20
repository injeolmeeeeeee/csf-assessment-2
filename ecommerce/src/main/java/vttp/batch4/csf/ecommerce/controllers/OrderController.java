package vttp.batch4.csf.ecommerce.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import vttp.batch4.csf.ecommerce.models.Order;
import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;

@RequestMapping(path = "/api")
@RestController
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  @PostMapping("/order")
  public ResponseEntity<String> postOrder(Order order) {
    System.out.println(order);
    // TODO Task 3
	 try {
    poSvc.createNewPurchaseOrder(order);
    return ResponseEntity.ok(
      Json.createObjectBuilder()
        .add("orderId", order.getOrderId())
        .build()
        .toString()
    );
   } catch (RuntimeException e) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
      Json.createObjectBuilder()
        .add("message", e.getMessage())
        .build()
        .toString()
    );
   }
  }
}
