from django.db import models
from account.models import CustomUser

class ExpenseTracker(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    expense_item = models.CharField(max_length=255)
    expense_date = models.DateField(null=True, blank=True)
    expense_price = models.DecimalField(max_digits=8, decimal_places=2)
    note_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.expense_item 
