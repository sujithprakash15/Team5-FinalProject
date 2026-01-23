-- 1.Department Sample Data
INSERT INTO Department (DeptId, DeptName, Description) VALUES
('D001', 'IT', 'Handles software, hardware and network systems.'),
('D002', 'HR', 'Responsible for recruitment, payroll and employee welfare.'),
('D003', 'Finance', 'Manages budgeting, invoicing and financial reporting.'),
('D004', 'Support', 'Handles customer queries, complaints and ticket resolution.');

select * from Department

-- 2.Employee Sample Data
INSERT INTO Employee (EmpId, EmpName, Password, Role, DeptId) VALUES
('E001', 'Arun Kumar', 'Arun@123', 'Engineer', 'D001'),
('E002', 'Priya Sharma', 'Priya@123', 'HR Executive', 'D002'),
('E003', 'Rahul Menon', 'Rahul@123', 'Accountant', 'D003'),
('E004', 'Sana Banu', 'Sana@123', 'Support Agent', 'D004'),
('E005', 'Sri harini', 'Sri@123', 'Admin', 'D004'),
('E006', 'Sujith', 'Suj@123', 'Admin', 'D003'),
('E007', 'Selva', 'Sel@123', 'User', 'D003');

select * from Employee

-- 3.SLA Sample Data
INSERT INTO SLA (SLAId, SLAName, Priority, ResponseTime, ResolutionHours) VALUES
('S001', 'Critical Issue SLA', 'Critical', 1, 4),
('S002', 'High Priority SLA', 'High', 2, 12),
('S003', 'Medium Priority SLA', 'Medium', 4, 24),
('S004', 'Low Priority SLA', 'Low', 8, 72);

select * from SLA

-- 4. TicketType Sample Data
INSERT INTO TicketType (TicketTypeId, TypeName, Description, SLAId, DeptId)
VALUES
('T001', 'Hardware Issue', 'Problems related to laptop, desktop or peripherals.', 'S003', 'D001'),
('T002', 'Leave Request', 'Employee leave or attendance-related queries.', 'S004', 'D002'),
('T003', 'Reimbursement', 'Claims for travel or office expenses.', 'S002', 'D003'),
('T004', 'Application Issue', 'Issues related to software applications or login problems.', 'S001', 'D004');
 
SELECT * FROM TicketType;

-- 5. Ticket Sample Data
INSERT INTO Ticket (TicketId, Title, Description, TicketTypeId, TicketCreatedDate, Status, CreatedByEmpId, AssignedToEmpId)
VALUES
('TK01', 'Laptop crash', 'System crashes intermittently after login; happens 3-4 times daily.', 'T001', '2025-01-15T09:30:00', 'Open', 'E001', 'E002'),
('TK02', 'Leave balance', 'Leave balance not updated after last month’s approved leave.', 'T002', '2025-02-02T11:10:00', 'In Progress', 'E002', 'E003'),
('TK03', 'Travel claim', 'April travel reimbursement pending; receipts uploaded to portal.', 'T003', '2025-03-05T15:45:00', 'Open', 'E003', 'E001'),
('TK04', 'Login issue', 'Unable to login to the CRM app; getting invalid session error.', 'T004', '2025-04-10T10:05:00', 'Resolved', 'E001', 'E003');
 
SELECT * FROM Ticket;

-- 6. TicketReply Sample Data
INSERT INTO TicketReply (ReplyId, TicketId, ReplyByCreatorEmpId, ReplyByAssignedEmpId, ReplyMessage)
VALUES
('R00001', 'TK01', 'E001', 'E002', 'I am facing frequent system crashes while working.'),
('R00002', 'TK02', NULL, 'E002', 'Please restart and update your system. Let me know if issue persists.'),
('R00003', 'TK03', 'E002', NULL, 'Requesting clarification on leave balance discrepancies.'),
('R00004', 'TK04', NULL, 'E003', 'Your leave balance has been updated correctly now.');
 
SELECT * FROM TicketReply;

DELETE FROM Ticket;

DROP DATABASE EYTicketPortalDB