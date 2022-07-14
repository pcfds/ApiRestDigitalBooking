package integrativeproject.digitalbooking.model.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "features")

public class Feature {

    @Id
    @GeneratedValue(strategy = javax.persistence.GenerationType.IDENTITY )
    private Integer id;
    private String feature;
//    @ManyToMany(targetEntity = Product.class, mappedBy = "features", cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.REFRESH})
//    @JsonIgnore
//    private List<Product> products;

   // private string imageURl; después veremos si se usa, por ahora del lado de front

}
