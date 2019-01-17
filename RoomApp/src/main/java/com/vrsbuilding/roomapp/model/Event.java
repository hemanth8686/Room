package com.vrsbuilding.roomapp.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

import org.hibernate.type.descriptor.sql.VarbinaryTypeDescriptor;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
@Entity
@Table(name = "Event")
public class Event {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)

	@Column(name = "ID")
	private int id;
	@Column(name = "event_text")
	private String event;
	@Column(name = "event_date")
	private String eventDate;
	@Column(name = "CREATED_DATE")
	private String createdDate;
	@Column(name = "CREATED_BY")
	private int createdBy;
	@Column(name = "PATH")
	private String path;
	
	@Column(name = "event_img")
	@Lob
	private byte[] eventImg;
	
	/*@Column(name = "EVENT_IMAGE")
	private MultipartFile image;*/
	
	public String getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}
	
	public int getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getEvent() {
		return event;
	}
	public void setEvent(String event) {
		this.event = event;
	}
	public String getEventDate() {
		return eventDate;
	}
	public void setEventDate(String eventDate) {
		this.eventDate = eventDate;
	}
	/*public MultipartFile getImage() {
		return image;
	}
	public void setImage(MultipartFile image) {
		this.image = image;
	}
	
	*/
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public byte[] getEventImg() {
		return eventImg;
	}
	public void setEventImg(byte[] eventImg) {
		this.eventImg = eventImg;
	}
	
	
	
	
	
	
	
}
