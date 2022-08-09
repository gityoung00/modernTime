package com.care.moderntime.user.dao;

import com.care.moderntime.user.dto.CertificationDTO;

public interface CertificationDAO {
	
	int saveCertification(CertificationDTO certification);
	
	CertificationDTO selectCertification(int id);
	
	CertificationDTO selectAllCertification();
	
}
