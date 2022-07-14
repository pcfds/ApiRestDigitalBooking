package integrativeproject.digitalbooking.model.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;


@Entity
@Table(name = "policies")
@Data


public class Policy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private ArrayList norms;
    private ArrayList healthAndSecurity;
    private ArrayList cancellationPolicy;


}
