package com.vrsbuilding.roomapp.model;

import java.sql.Timestamp;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.TableGenerator;

import org.hibernate.annotations.GeneratorType;
import org.springframework.stereotype.Component;

@Component
@Entity
@Table(name = "EXPENSES")
public class Expenses {

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
	private Date ExpenseDate;

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

	public Date getExpenseDate() {
		return ExpenseDate;
	}

	public void setExpenseDate(Date expenseDate) {
		ExpenseDate = expenseDate;
	}

	@Override
	public String toString() {
		return "Expenses [id=" + id + ", type=" + type + ", amount=" + amount + ", userID=" + userID + ", createdDate="
				+ createdDate + ", ExpenseDate=" + ExpenseDate + "]";
	}

}
