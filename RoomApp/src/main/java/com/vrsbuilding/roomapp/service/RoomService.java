package com.vrsbuilding.roomapp.service;

import java.io.IOException;
import java.sql.Date;
import java.text.ParseException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vrsbuilding.roomapp.bean.RegisterBean;
import com.vrsbuilding.roomapp.dao.RoomDao;
import com.vrsbuilding.roomapp.model.Event;
import com.vrsbuilding.roomapp.model.Expenses;
import com.vrsbuilding.roomapp.model.MontlyExpenses;
import com.vrsbuilding.roomapp.model.RoomRegister;

@Service
public class RoomService {
	
	@Autowired
	private RoomDao roomDao;
	@Autowired
	private RoomRegister roomRegister;
	@Autowired
	private Expenses expenses;
	@Autowired
	private MontlyExpenses montlyExpenses;
	
	


	public void register(String firstName,String lastName,int age,String mobile,String password,String email,String dob,int status,byte []bs) throws Exception {
		roomDao.register(firstName,lastName,age,mobile,password,email,dob,status,bs);
		
	}
	public String getPassword(int userName) {
		return roomDao.getPassword(userName);
	}
	public String getFirstName(int userName) {
		return roomDao.getFirstName(userName);
	}
	
	public int status(int userName) {
		return roomDao.getStatus(userName);
	}
	public void enterDailyExpenses(String type, int amount, Integer userID,String expenseDate) throws Exception {
		roomDao.enterDailyexpenses(type,amount,userID,expenseDate);
		
	}
	public void enterMonthlyExpenses(String type, int amount, Integer userID, String expenseDate) throws Exception {
		roomDao.enterMonthlyexpenses(type,amount,userID,expenseDate);
		
	}
	
	public List<Expenses> getExpenseList(Integer userID, java.util.Date fDate, java.util.Date tDate) throws ParseException{
		return roomDao.getExpenseList(userID,fDate,tDate);
	}
	public List<Expenses> userWise(int userID,int userName,java.util.Date fDate,java.util.Date tDate){
		return roomDao.userWise(userID, userName,fDate,tDate);
	}
	public void setEvent(String eventDate,String event,int userID,byte[] bytes ) throws ParseException {
		 roomDao.setEvent(eventDate,event,userID, bytes);
	}
	public List<Event> showEvent(String date) throws ParseException, IOException {
		return roomDao.showEvent(date);
	}
	
	public List<RoomRegister>  getActivatedList(){
		return roomDao.getActivatedlist();
	}
	
	public List<RoomRegister>  getDeActivatedList(){
		return roomDao.getDeactivatedlist();
	}
	
	
	public void activateUser(int userID) {
		roomDao.activateUser(userID);
	}
	
	
	public List<RoomRegister>  getRegisterUser(int userName){
		return roomDao.getRegisterUser( userName);
	}
	
	

	
}
