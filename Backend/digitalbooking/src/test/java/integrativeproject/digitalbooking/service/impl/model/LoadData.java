package integrativeproject.digitalbooking.service.impl.model;

import integrativeproject.digitalbooking.model.entity.Feature;

import java.util.Arrays;
import java.util.List;

public class LoadData {

    public List<Feature> features (){
        Feature feature1 = new Feature();
        feature1.setId(1);
        feature1.setFeature("Test");

        Feature feature2 = new Feature();
        feature2.setId(2);
        feature2.setFeature("Test2");

        return Arrays.asList(feature1, feature2);
    }

    public Feature feature (){
        Feature feature = new Feature();
        feature.setId(1);
        feature.setFeature("Test");
        return feature;
    }
}
