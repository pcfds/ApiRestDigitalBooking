package integrativeproject.digitalbooking.model.entity;

import lombok.*;

import javax.persistence.*;

@Data
@Entity
@Table(name = "images")

public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String url;
    private String alt;
//    @ManyToOne
//    @JoinColumn(name = "products_id", referencedColumnName="id", updatable = false, insertable = false)
//    @JsonIgnore
//    private Product product;

}
