from django.urls import path
from expense import views

urlpatterns = [
    path("add-expense/", views.AddExpenseTrackerAPI.as_view(), name="add-expense"),
    path("manage-expense/", views.ManageExpenseTrackerAPI.as_view(), name="manage-expense"),
    path("edit-expense/<int:expense_id>/", views.EditExpenseTrackerAPI.as_view(), name="edit-expense"),
    path("delete-expense/<int:expense_id>/", views.DeleteExpenseTrackerAPI.as_view(), name="delete-expense"),
    path("search-expense/", views.SearchExpenseTrackerAPI.as_view(), name="search-expense"),
]

