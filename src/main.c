#include <gtk/gtk.h>

int main(int argc, char *argv[]){
	gtk_init(&argc, &argv);

	GtkWidget *window = gtk_window_new(GTK_WINDOW_TOPLEVEL);
	gtk_window_set_title(GTK_WINDOW(window), "REMI");
	gtk_window_set_default_size(GTK_WINDOW(window), 800, 600);

	g_signal_connect(window, "destroy", G_CALLBACK(gtk_main_quit), NULL);

	GtkTextBuffer *buffer = gtk_text_buffer_new(NULL);

	GtkWidget *text_view = gtk_text_view_new_with_buffer(buffer);

	gtk_text_view_set_wrap_mode(GTK_TEXT_VIEW(text_view), GTK_WRAP_WORD_CHAR);

	gtk_container_add(GTK_CONTAINER(window), text_view);

	gtk_widget_show_all(window);
	gtk_main();
	return 0;
}
