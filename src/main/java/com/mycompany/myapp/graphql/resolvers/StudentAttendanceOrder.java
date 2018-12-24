package com.mycompany.myapp.graphql.resolvers;

import com.fasterxml.jackson.annotation.JsonProperty;


import java.util.List;
import java.util.Optional;

/**
 * @author Xiangbin HAN (hanxb2001@163.com)
 *
 */
public class StudentAttendanceOrder {
    
    private OrderField field;
    private OrderType order;
    
    @JsonProperty("field")
    public OrderField getField() {
        return field;
    }
    
    public void setField(OrderField field) {
        this.field = field;
    }
    
    @JsonProperty("order")
    public OrderType getOrder() {
        return order;
    }
    
    public void setOrder(OrderType order) {
        this.order = order;
    }
    
    @Override
    public String toString() {
        return this.field.toString() + " " + this.order.toString();
    }

   
    /**
     * @param orders
     * @return String
     */
    public static String buildOrderJpaQuery(List<StudentAttendanceOrder> orders) {
        StringBuilder sb = new StringBuilder();

        Optional<List<StudentAttendanceOrder>> nonNullOrders = Optional.ofNullable(orders);
        nonNullOrders.ifPresent(list -> 
            {sb.append(" order by");
            list.forEach(order -> sb.append(" student_attendance." + order.getField() + " " + order.getOrder() + ","));}
        );

        if(sb.indexOf("order by") > 0)
            return sb.substring(0, sb.lastIndexOf(","));
        else
            return "";
    }
}
