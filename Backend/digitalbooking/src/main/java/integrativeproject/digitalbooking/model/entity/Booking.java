package integrativeproject.digitalbooking.model.entity;

import integrativeproject.digitalbooking.model.entity.security.User;
import lombok.Data;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;


@Data
@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Time time;
    private Date bookingStartDate;
    private Date bookingEndDate;

    @ManyToOne
    @JoinColumn(name = "products_id", referencedColumnName = "id")
    private Product product;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    /*In case of verification required to booking*/

   /* @Column(name = "verification_code", length = 64)
    private String verificationCode;
    private boolean enabled;*/

}
