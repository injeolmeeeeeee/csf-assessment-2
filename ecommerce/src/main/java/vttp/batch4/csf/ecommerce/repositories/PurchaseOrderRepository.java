package vttp.batch4.csf.ecommerce.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;

@Repository
public class PurchaseOrderRepository {

  @Autowired
  private JdbcTemplate template;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // You may only add Exception to the method's signature
  @Transactional(rollbackFor = RuntimeException.class)
  public void create(Order order) {
    int insertOrderRows = template.update("INSERT INTO order_data VALUES (?, ?, ?, ?, ?, ?)",
      order.getOrderId(),
      order.getDate(),
      order.getName(),
      order.getAddress(),
      order.getPriority(),
      order.getComments()
    );

    if (insertOrderRows < 1) {
      throw new RuntimeException("Failed to insert into order_data.");
    }

    for (LineItem item : order.getCart().getLineItems()) {
      int insertItemRows = template.update("INSERT INTO line_items VALUES (?, ?, ?, ?, ?)",
        item.getProductId(),
        order.getOrderId(),
        item.getQuantity(),
        item.getName(),
        item.getPrice()
      );

      if (insertItemRows < 1) {
        throw new RuntimeException("Failed to insert %s into line_items.".formatted(item.getName()));
      }
    }
  }
}
