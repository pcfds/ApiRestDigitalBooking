package integrativeproject.digitalbooking.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import integrativeproject.digitalbooking.model.entity.Feature;
import integrativeproject.digitalbooking.model.entity.Image;
import lombok.Data;

import java.sql.Time;
import java.util.List;
import java.util.Set;

@JsonIgnoreProperties(ignoreUnknown = true)
@Data

public class ProductDTO {

    private Integer id;
    private String name;
    private String nameIdentifier;
    private String description;
    private CategoryDTO category;
    private int rating;
    private Time checkOut;
    private CityDTO city;
    private List<Feature> features;
    private Set<Image> images;
    private Double latitude;
    private Double longitude;
    private PolicyDTO policy;


}
