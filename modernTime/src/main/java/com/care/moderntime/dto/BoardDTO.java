package com.care.moderntime.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardDTO {
	private int id;
	private String name;
	private String title;
	private List<MainPostListDTO> posts;
}
