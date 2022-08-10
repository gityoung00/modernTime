package com.care.moderntime.user.dao;

import org.apache.ibatis.annotations.Mapper;

import com.care.moderntime.user.dto.CertificationDTO;

@Mapper
public interface CertificationDAO {
	
	int saveCertification(CertificationDTO certification);
	
	CertificationDTO selectCertification(int id);
	
	CertificationDTO selectAllCertification();
	
	// 학교인증 제출 여부 확인
	int checkCertification(String userId);
	
	// 학교인증 여부 확인
	int isCertificate(String id);
	
}
