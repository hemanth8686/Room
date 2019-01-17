package com.vrsbuilding.roomapp.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;
@Component
@Table(name="MONTLYEXPENSES")
@Entity
public class MontlyExpenses {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)

	@Column(name = "ID")
	private int id;
	@Column(name = "TYPE")
	private String type;
	@Column(name = "amount")
	private int amount;
	@Column(name = "USERID")
	private int userID;
	@Column(name = "CREATEDDATE")
	private String createdDate;
	@Column(name = "EXPENSEDATE")
	private String expenseDate;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	public int getUserID() {
		return userID;
	}
	public void setUserID(int userID) {
		this.userID = userID;
	}
	public String getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}
	public String getExpenseDate() {
		return expenseDate;
	}
	public void setExpenseDate(String expenseDate) {
		this.expenseDate = expenseDate;
	}


}
