package integrativeproject.digitalbooking.model.dto;

import integrativeproject.digitalbooking.model.entity.security.User;
import lombok.Data;

import java.sql.Date;
import java.sql.Time;

@Data
public class BookingDTO {

    private Integer id;
    private Time time;
    private Date bookingStartDate;
    private Date bookingEndDate;
    private ProductDTO product;
    private User user;

    /*In case of verification required to booking*/
   /* private String verificationCode;
    private boolean enabled;*/
}
