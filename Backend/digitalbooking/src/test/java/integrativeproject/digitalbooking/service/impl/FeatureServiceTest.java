package integrativeproject.digitalbooking.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import integrativeproject.digitalbooking.model.dto.FeatureDTO;
import integrativeproject.digitalbooking.model.entity.Feature;
import integrativeproject.digitalbooking.repository.IFeatureRepository;
import integrativeproject.digitalbooking.service.impl.model.LoadData;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;
import org.mockito.junit.jupiter.MockitoExtension;


import java.util.List;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
@RunWith(MockitoJUnitRunner.class)


class FeatureServiceTest {

    @Mock
    private IFeatureRepository featureRepository;
    @InjectMocks
    private FeatureService featureService;

    private Feature feature;

    private Set<FeatureDTO> features;
    List<Feature> featuresList;
    @Mock
    ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        LoadData loadData = new LoadData();
        featuresList = loadData.features();
        LoadData loadData2 = new LoadData();
        feature = loadData2.feature();



    }

    @Test
    void findById() {
        featureRepository.findById(feature.getId());
        FeatureDTO featureDTO = objectMapper.convertValue(feature, FeatureDTO.class);
        assertEquals(featureDTO, featureService.findById(feature.getId()));



    }

    @Test
    void deleteById() {
        featureRepository.deleteById(feature.getId());
        assertNotNull(feature);
    }

    @Test
    void update() {
        featureRepository.save(feature);
        FeatureDTO featureDTO = objectMapper.convertValue(feature, FeatureDTO.class);
        assertEquals(featureDTO, featureService.update(featureDTO));
    }

    @Test
    void findAll() {
        when(featureRepository.findAll()).thenReturn(featuresList);
        Set<FeatureDTO> featuresDTO = featureService.findAll();
        assertNotNull(featuresDTO);
    }
}