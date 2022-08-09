package com.care.moderntime.user.dao;

import org.apache.ibatis.annotations.Mapper;

import com.care.moderntime.user.dto.CertificationDTO;

@Mapper
public interface CertificationDAO {
	
	int saveCertification(CertificationDTO certification);
	
	CertificationDTO selectCertification(int id);
	
	CertificationDTO selectAllCertification();
	
}
