package integrativeproject.digitalbooking.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class FeatureDTO {
    private Integer id;
    private String feature;
}
