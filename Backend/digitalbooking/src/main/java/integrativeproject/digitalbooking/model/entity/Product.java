package integrativeproject.digitalbooking.model.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import integrativeproject.digitalbooking.model.entity.security.User;
import lombok.*;

import javax.persistence.*;
import java.sql.Time;
import java.util.List;
import java.util.Set;


@Data
@Entity
@Table(name = "products")


public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    private String nameIdentifier;
    private String description;
    private Double latitude;
    private Double longitude;
    private int rating;
    private Time checkOut;
    @EqualsAndHashCode.Exclude @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    @EqualsAndHashCode.Exclude @ToString.Exclude
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "products_id", nullable = false , referencedColumnName = "id")
    private Set<Image> images;
    @EqualsAndHashCode.Exclude @ToString.Exclude
    @ManyToOne(fetch=FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinColumn(name = "cities_id",referencedColumnName = "id", nullable = false)
    private City city;
    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE, CascadeType.REFRESH})
    @JoinTable(name = "products_features", joinColumns = @JoinColumn(name = "products_id"), inverseJoinColumns = @JoinColumn(name = "features_id"))
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    private List<Feature> features;
    @EqualsAndHashCode.Exclude @ToString.Exclude
    @OneToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "policies_id", referencedColumnName = "id")
    private Policy policy;
    @ManyToMany(mappedBy = "likedProducts")
    @JsonIgnore
    Set<User> likes;
    @Transient
    private Booking booking;


}
