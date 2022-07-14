package integrativeproject.digitalbooking.repository;

import integrativeproject.digitalbooking.model.entity.Policy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPolicyRepository extends JpaRepository<Policy, Integer> {

}

